require "open-uri"
require "htmltokenizer/lib/html/htmltokenizer.rb"

# read table from web
url = "http://sports.espn.go.com/ncf/teamsched?teamId=" + ARGV[0] 
inTable = false
table = "<table>"
open(url).each do |line|
	if(line =~ /<tr.*class="oddrow"/)
		table << line
	end
end

# modify table contents

# strip <a> and <img> tags
tokenizer = HTMLTokenizer.new(table)
table = ""
while(token = tokenizer.getTag)
    if(token.to_s =~ /<a/)
        table << tokenizer.getText
    elsif(token.to_s =~ /<\/a/ or token.to_s =~ /<img/);
    else
        table << token.to_s << tokenizer.getText
    end
end

#remove colums 4-5
tokenizer = HTMLTokenizer.new(table)
table = ""
table << tokenizer.getTag('table').to_s
while(token = tokenizer.getTag('tr'))
    table << token.to_s
    3.times do
        token = tokenizer.getTag('td')

        # Handle glossary table
        break if token.nil?
        text = tokenizer.getText
        break if text =~ /^\*/ || text == "Glossary"

        table << token.to_s << text
        token = tokenizer.getTag('/td')
        table << token.to_s
    end
    token = tokenizer.getTag('/tr')
    table << token.to_s
end
table << "</table>"

#strip tag attributes
tokenizer = HTMLTokenizer.new(table)
table = ""
while(token = tokenizer.getTag)
    if token.attr_hash.length > 0
        table << "<#{token.tag_name}>"
    else
        table << token.to_s
    end
    
    unless(token.to_s =~ /<\/.*/) 
        table << tokenizer.getText
    end
end

#change months to numbers
months = {
  "January" => "1",
  "February" => "2",
  "March" => "3",
  "April" => "4",
  "May" => "5",
  "June" => "6",
  "July" => "7",
  "August" => "8",
  "September" => "9",
  "October" => "10",
  "November" => "11",
  "December" => "12"
}
months.each_pair { |name, number| table.gsub!("#{name} ","#{number}/") }


#replace "No. " w/ "#"
table.gsub!(/No.\s/, "#")


#convert time zone
tz = Time.now.zone
if(tz =~ /[C|M|P][D|S]T/) # central, mountain, or pacific
    if(tz =~ /C[D|S]T/) # central 
        tzOffset = 1
    elsif(tz =~ /M[D|S]T/) # mountain
        tzOffset = 2
    elsif(tz =~ /P[D|S]T/) # mountain
        tzOffset = 3
    end

    re = /(\d+):(\d+) ([A|P]M)&nbsp;ET(.*?)</     # match a time hh:mm A|PM ET
    
    table.gsub!(re) do |m|
        md = re.match(m)
    
        # convert to 24 hour form and make tz adjustment
        hour = md[1].to_i
        hour += 12 if hour < 12 && md[3].upcase == 'PM'
        hour -= 12 if hour == 12 && md[3].upcase == 'AM'
        hour -= tzOffset	# the tz adjustment from ET to local
        hour += 24 if hour < 0
        
        # convert back to 12 hour form
        ampm = (hour < 12 ? 'AM' : 'PM')
        hour -= 12 if hour > 12
        
        hour.to_s + ':' + md[2] + ' ' + ampm + '<'
    end
end

print table
        
