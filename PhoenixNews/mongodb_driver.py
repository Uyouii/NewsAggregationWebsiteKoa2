import pymongo

class ConnectDatabase(object):
    def __init__(self):
        connection = pymongo.MongoClient('127.0.0.1', 27017)
        self.db = connection.newsSpider
        self.news = self.db.news

    def insertToDatabase(self,type,href,newsData):
        print(newsData['title'])
        print(newsData['datetime'])
        if newsData['title'] is not None and newsData['datetime'] is not None and len(newsData['content']) > 0:
            isReturn = True
            for con in newsData['content']:
                if con[0] == 'p' or con[0] == 'strong':
                    isReturn = False
                    break
            if isReturn:
                return
            self.news.insert({'type':type,'href':href,'title':newsData['title'], 'datetime':newsData['datetime'],
                              'content':newsData['content']})
