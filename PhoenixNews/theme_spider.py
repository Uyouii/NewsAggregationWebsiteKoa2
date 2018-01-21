from urllib import request
from bs4 import BeautifulSoup
import re


class ThemeSpider(object):
    def __init__(self, theme_url,judge_url):
        self.theme_url = theme_url
        self.judge_url = judge_url

    def getLinkList(self):
        response = request.urlopen(self.theme_url)
        linkSet = set()
        linkList = []
        if response.getcode() != 200:
            print("fail to get to first page")
            return linkList
        html_cont = response.read()
        soup = BeautifulSoup(html_cont, 'html.parser', from_encoding='utf-8')

        h1 = soup.find('h1')
        if hasattr(h1,'a') and h1.a is not None and h1.a['href'] != "#":
            linkList.append({'title':h1.a.text.strip(),'href':h1.a['href'].strip()})
            linkSet.add(h1.a['href'])

        #aLinks = soup.find_all('a', href=re.compile(r"http://finance.ifeng.com/a/\d+"))
        aLinks = soup.find_all('a', href=re.compile(self.judge_url))
        for link in aLinks:
            if link['href'] not in linkSet and link['href'] != "#":
                l = len(link.text.strip())
                if link.get('title',None) != None and link['title'] != '评论':
                    if len(link['title'].strip()) > 0:
                        linkList.append({'title':link['title'].strip(), 'href':link['href'].strip()})
                elif link.get('class',None) != None:
                    #排除掉网站上评论部分按钮的链接
                    if link['class'][0] != 'pinl' and l > 0:
                        linkList.append({'title':link.text.strip(),'href':link['href'].strip() })
                        # linkSet.add(link['href'])
                elif l > 0:
                    linkList.append({'title': link.text.strip(), 'href': link['href'].strip()})
                    # linkSet.add(link['href'])
                linkSet.add(link['href'])

        return linkList
