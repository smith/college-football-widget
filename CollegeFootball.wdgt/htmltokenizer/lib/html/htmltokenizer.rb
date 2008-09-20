# Copyright (C) 2003 Ben Giddings
#
# Author Ben Giddings
#
# This file may be used under the same license as Ruby
#
# Description:
# This is a partial port of the functionality behind Perl's TokeParser
# Provided a page it progressively returns tokens from that page

# $Id: htmltokenizer.rb,v 1.3 2004/03/04 21:28:16 merc Exp $
class HTMLTokenizer
  attr_reader :page
  def initialize(content)
    @page = content
    @cur_pos = 0
  end

  def reset
    @cur_pos = 0
  end

  def peekNextToken
    if @cur_pos == @page.length then return nil end

    if ?< == @page[@cur_pos]
      # Next token is a tag of some kind
      if '!--' == @page[(@cur_pos + 1), 3]
        # Token is a comment
        tag_end = @page.index('-->', (@cur_pos + 1))
        if tag_end.nil?
          raise "No end found to started comment:\n#{@page[@cur_pos,80]}"
        end
        # p @page[@cur_pos .. (tag_end+2)]
        HTMLComment.new(@page[@cur_pos .. (tag_end + 2)])
      else
        # Token is a html tag
        tag_end = @page.index('>', (@cur_pos + 1))
        if tag_end.nil?
          raise "No end found to started tag:\n#{@page[@cur_pos,80]}"
        end
        # p @page[@cur_pos .. tag_end]
        HTMLTag.new(@page[@cur_pos .. tag_end])
      end
    else
      # Next token is text
      text_end = @page.index('<', @cur_pos)
      text_end = text_end.nil? ? -1 : (text_end - 1)
      # p @page[@cur_pos .. text_end]
      HTMLText.new(@page[@cur_pos .. text_end])
    end
  end

  def getNextToken
    token = peekNextToken
    if token
      # @page = @page[token.raw.length .. -1]
      # @page.slice!(0, token.raw.length)
      @cur_pos += token.raw.length
    end
    #p token
    #print token.raw
    return token
  end

  def getTag(*sought_tags)
    sought_tags.collect! {|elm| elm.downcase}

    while (tag = getNextToken)
      if tag.kind_of?(HTMLTag) and
          (0 == sought_tags.length or sought_tags.include?(tag.tag_name))
        break
      end
    end
    tag
  end

  def getText(until_tag = nil)
    if until_tag.nil?
      if ?< == @page[@cur_pos]
        # Next token is a tag, not text
        ""
      else
        # Next token is text
        getNextToken.text
      end
    else
      ret_str = ""

      while (tag = peekNextToken)
        if tag.kind_of?(HTMLTag) and tag.tag_name == until_tag
          break
        end

        if ("" != tag.text)
          ret_str << (tag.text + " ")
        end
        getNextToken
      end

      ret_str
    end
  end

  def getTrimmedText(until_tag = nil)
    getText(until_tag).strip.gsub(/\s+/m, " ")
  end

end

class HTMLToken
  attr_accessor :raw
  def initialize(text)
    @raw = text
  end

  def to_s
    raw
  end

  def text
    # By default tokens have no text representation
    ""
  end

  def trimmed_text
    text.strip.gsub(/\s+/m, " ")
  end
end

class HTMLText < HTMLToken
  def text
    raw
  end
end

class HTMLComment < HTMLToken
  attr_accessor :contents
  def initialize(text)
    super(text)
    temp_arr = text.scan(/^<!--\s*(.*?)\s*-->$/m)
    if temp_arr[0].nil?
      raise "Text passed to HTMLComment.initialize is not a comment"
    end

    @contents = temp_arr[0][0]
  end
end

class HTMLTag < HTMLToken
  attr_reader :end_tag, :tag_name
  def initialize(text)
    super(text)
    if ?< != text[0] or ?> != text[-1]
      raise "Text passed to HTMLComment.initialize is not a comment"
    end

    @attr_hash = Hash.new
    @raw = text

    tag_name = text.scan(/[\w:]+/)[0]
    if tag_name.nil?
      raise "Error, tag is nil: #{tag_name}"
    end
    
    if ?/ == text[1]
      # It's an end tag
      @end_tag = true
      @tag_name = '/' + tag_name.downcase
    else
      @end_tag = false
      @tag_name = tag_name.downcase
    end

    @hashed = false
  end

  def attr_hash
    # Lazy initialize == don't build the hash until it's needed
    if !@hashed
      if !@end_tag
        # Get the attributes
        attr_arr = @raw.scan(/<[\w:]+\s+(.*)>/m)[0]
        if attr_arr.kind_of?(Array)
          # Attributes found, parse them
          attrs = attr_arr[0]
          attr_arr = attrs.scan(/\s*([\w:]+)(?:\s*=\s*("[^"]*"|'[^']*'|([^"'][^\s>]+)))?/m)
          # clean up the array by:
          # * setting all nil elements to true
          # * removing enclosing quotes
          attr_arr.each {
            |item|
            val = if item[1].nil?
                    true
                  elsif '"'[0] == item[1][0] or '\''[0] == item[1][0]
                    item[1][1 .. -2]
                  else
                    item[1]
                  end
            @attr_hash[item[0].downcase] = val
          }
        end
      end
      @hashed = true
    end

    #p self

    @attr_hash
  end

  def text
    if !end_tag
      case tag_name
      when 'img'
        if !attr_hash['alt'].nil?
          return attr_hash['alt']
        end
      when 'applet'
        if !attr_hash['alt'].nil?
          return attr_hash['alt']
        end
      end
    end
    return ''
  end
end

if $0 == __FILE__
  page = "<HTML>
<HEAD>
<TITLE>This is the title</TITLE>
</HEAD>
<!-- Here comes the <a href=\"missing.link\">blah</a>
body
 -->
<BODY>
  <H1>This is the header</H1>
  <P>
    This is the paragraph, it contains
    <a href=\"link.html\">links</a>, 
    <img src=\"blah.gif\" optional alt='images
are
really cool'>.  Ok, here is some more text and
    <A href=\"http://another.link.com/\">another link</A>.
  </P>
</body>
</HTML>
"
  toke = HTMLTokenizer.new(page)
  p toke.getTag("IMG", "A")
  p toke.getTrimmedText
  #p toke.getTrimmedText("/P")
  #while (t = toke.getNextToken)
  #  p t
  #  print t.trimmed_text + " "
  #end
  #p toke.page
end
