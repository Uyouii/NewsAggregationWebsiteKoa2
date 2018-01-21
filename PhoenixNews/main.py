from PhoenixNews import theme_spider
from PhoenixNews import page_spider
from PhoenixNews import mongodb_driver

theme_url_list = [
    {'name':'即时',   'href':"http://news.ifeng.com/listpage/11502/0/1/rtlist.shtml",'judge':"http://news.ifeng.com/a/\d+"},#18
    {'name':'大陆',   'href':"http://news.ifeng.com/mainland/",           'judge':"http://news.ifeng.com/a/\d+" },#0
    {'name':'国际',   'href':"http://news.ifeng.com/world/",              'judge':"http://news.ifeng.com/a/\d+"},#1
    {'name':'台湾',   'href':"http://news.ifeng.com/taiwan/",             'judge':"http://news.ifeng.com/a/\d+"},#2
    {'name':'社会',   'href':"http://news.ifeng.com/society/",            'judge':"http://news.ifeng.com/a/\d+"},#3
    {'name':'军事',   'href':"http://news.ifeng.com/mil/index.shtml",     'judge':"http://news.ifeng.com/a/\d+"},#4
    {'name':'港澳',   'href':"http://news.ifeng.com/hongkong/index.shtml",'judge':"http://news.ifeng.com/a/\d+"},#5
    {'name':'历史',   'href':"http://news.ifeng.com/history/",            'judge':"http://news.ifeng.com/a/\d+"},#6
    {'name':'财经',   'href':'http://finance.ifeng.com/',                 'judge':"http://finance.ifeng.com/a/"},#7
    {'name':'娱乐',   'href':'http://ent.ifeng.com/',                     'judge':"http://ent.ifeng.com/a/"},#8
    {'name':'体育',   'href':'http://sports.ifeng.com/',                  'judge':"http://sports.ifeng.com/a/"},#9
    {'name':'时尚',   'href':'http://fashion.ifeng.com/',                 'judge':"http://fashion.ifeng.com/a/"},#10
    {'name': '科技',  'href': 'http://tech.ifeng.com/',                   'judge': "http://tech.ifeng.com/a/"},#11
    {'name': '读书',  'href': 'http://book.ifeng.com/',                   'judge': "http://book.ifeng.com/a/"},#12
    {'name': '游戏',  'href': 'http://games.ifeng.com/',                  'judge': "http://games.ifeng.com/a/"},#13
    {'name': '文化',  'href': 'http://culture.ifeng.com/',                'judge': "http://culture.ifeng.com/a/"},#14
    {'name': '公益',  'href': 'http://gongyi.ifeng.com/',                 'judge': "http://gongyi.ifeng.com/a/"},#15
    {'name': '旅游',  'href': 'http://travel.ifeng.com/',                 'judge': "http://travel.ifeng.com/a/"},#16
    {'name': '健康',  'href': 'http://fashion.ifeng.com/health/',         'judge': "http://fashion.ifeng.com/a/"},#17
    #{'name': '博客',  'href': 'http://blog.ifeng.com/',                   'judge': "http://blog.ifeng.com/article/"},#18
    #{'name':'汽车',   'href':'http://auto.ifeng.com/',                    'judge':"http://auto.ifeng.com/[0-9a-zA-Z\_/]*/\d+.shtml"},#19
]

# for theme in theme_url_list:
#     t_spider = theme_spider.ThemeSpider(theme['href'],theme['judge'])
#     linkList = t_spider.getLinkList()
#     i = 0
#     for link in linkList:
#         i += 1
#         print(i)
#         print("%s %s" % (link['title'] , link['href']))
#         page_s = page_spider.PageSpider(link['href'])
#         page_s.getContent()
#
#     print("%d lines" % len(linkList))

# t_spider = theme_spider.ThemeSpider(theme_url_list[18]['href'],theme_url_list[18]['judge'])
# linkList = t_spider.getLinkList()
# i = 0
# for link in linkList:
#     i += 1
#     print(i)
#     print("%s %s" % (link['title'], link['href']))
#     page_s = page_spider.PageSpider(link['href'])
#     data = page_s.getContent()
#     print('title: ' + data['title'])
#     print('datetime: ' + data['datetime'])
#     for c in data['content']:
#         print("%s %s" % (c[0], c[1]))

# page_s = page_spider.PageSpider("http://fashion.ifeng.com/a/20170519/40246533_0.shtml")
# data = page_s.getContent()



mongodb = mongodb_driver.ConnectDatabase()

for theme in theme_url_list:

    t_spider = theme_spider.ThemeSpider(theme['href'],theme['judge'])
    linkList = t_spider.getLinkList()
    i = 0
    for link in linkList:
        page_s = page_spider.PageSpider(link['href'])

        newsData = page_s.getContent()
        if newsData is not None:
            i += 1
            print("%d %s %s" % (i,theme['name'] , link['href']))
            mongodb.insertToDatabase(theme['name'],link['href'],newsData)

