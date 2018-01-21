from urllib import request
from bs4 import BeautifulSoup


class PageSpider(object):
    def __init__(self, page_url):
        self.page_url = page_url

    # @property
    def getContent(self):
        try:
            response = request.urlopen(self.page_url)
            if response.getcode() != 200:
                print("fail to get to first page")
                return None

            html_cont = response.read()
            soup = BeautifulSoup(html_cont, 'html.parser', from_encoding='utf-8')

            main_content = soup.find('div', id = 'main_content')
            titleDiv = soup.find('div', id="titL")
            head3 = soup.find('div',class_ = "yc_tit")

            if main_content is not None:
                #获取文章标题
                title = soup.find('h1').text.strip()
                #获取发行时间
                datetime = soup.find('span', itemprop = 'datePublished').text.strip()

                #获取正文
                contents = []
                soup_contents = main_content.find_all('p')
                for con in soup_contents:
                    img = con.find('img')
                    #图片
                    # a = con.get('style',None)
                    conclass = con.get('class',None)
                    if img != None:
                        text = con.text.strip()
                        if len(text) > 0:
                            contents.append(['p', text])
                        contents.append(['img', img['src']])
                    #正文
                    elif con.strong is not None:
                        text = con.text.strip()
                        if len(text) > 0:
                            contents.append(['strong', text])
                    else:
                        text = con.text.strip()
                        if len(text) > 0:
                            contents.append(['p', text])

                # print('title: ' + title)
                # print('datetime: ' + datetime)
                # for c in contents:
                #     print("%s %s" % (c[0], c[1]))

                return {'title': title, 'datetime': datetime, 'content': contents}
            elif titleDiv is not None:
                #标题
                title = titleDiv.find('h1').text
                #日期及时间
                datetime = titleDiv.find('p').text

                head = soup.find('head')
                #获取解说文字
                p = head.find('meta',itemprop = 'description')['content']
                if len(p) > 0:
                    #获取图片
                    img = head.find('meta',itemprop = 'image')['content']

                    contents = [['img', img], ['p', p]]
                    # print('title: ' + title)
                    # print('datetime: ' + datetime)
                    # for c in contents:
                    #     print("%s %s" % (c[0], c[1]))

                    return {'title': title, 'datetime': datetime, 'content': contents}
                else:
                    return None
            elif head3 is not None:
                #标题
                title = head3.find('h1').text
                #日期及时间
                datetime = head3.find('p').find('span').text
                #正文
                contents = []
                soup_contents = soup.find('div',id = "yc_con_txt").find_all('p')
                for con in soup_contents:
                    img = con.find('img')
                    if img is not None:
                        text = con.text.strip()
                        if len(text) > 0:
                            contents.append(['p', text])
                        contents.append(['img',img['src']])
                    elif con.strong is not None:
                        text = con.text.strip()
                        if len(text) > 0:
                            contents.append(['strong',text])
                    else:
                        text = con.text.strip()
                        if len(text) > 0:
                            contents.append(['p',text])
                return {'title':title, 'datetime':datetime, 'content':contents}
            else :
                return None
        except:
            print("Something wrog")
            return None
