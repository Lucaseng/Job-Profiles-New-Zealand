from bs4 import BeautifulSoup
import requests
import json
import re

def getProfiles():
    #for i in range(0, 420, 10):
    data = []
    for i in range(300, 420, 10):

        url = "https://www.careers.govt.nz/searchresults?tab=jobs&q=&start=" + str(i)
        print(url)
        result = requests.get(url)
        soup = BeautifulSoup(result.text, "html.parser")
        mainDiv = soup.find("section", {"id": "results-data-items"})
        cards = mainDiv.find_all("article", {"class":"job"})
        for card in cards:
            # Get Title
            title = card.find("h3", {"class": "title"})
            title = title.find("a").get_text().replace("\u200b", "")
            print("Searching " + title)

            # Get Sub-title
            subtitle = card.find("p", {"class": "sub-title"}).get_text(strip=True).replace("\u200b", "")

            # Get Description
            description = card.find("div", {"class": "description"}).find("p").get_text(strip=True).replace("\u200b", "")

            # Get Job Opportunity
            opportunity = card.find("dl", {"class": "job-opportunities"}).find("dd").get_text(strip=True)

            #Get Salary Range
            earnings = card.find("div", {"class": "earnings"}).find_all("p")
            salary = []

            if title == "Winemaker":
                salary.append({
                  "text": "Cellar hands and assistant winemakers usually earn $47K to $83K per year",
                  "range": [47000, 83000],
                })
                salary.append({
                  "text": "Winemakers and chief winemakers usually earn $89K-$211K per year",
                  "range": [89000, 211000],
                })

            else:
                for i in earnings:
                    numericrange = []
                    mytext = i.get_text(separator="\n", strip=True).split("\n")
                    if (len(mytext) == 2):

                        #print(mytext)

                        myrange = mytext[1][0:mytext[1].rfind("K") + 1].replace("–", "-").replace("-", "-").split("-")


                        #Check if the range is an hourly rate
                        if (myrange[0] == ""):
                            myrange = mytext[1][0:mytext[1].find(" ")].replace("–", "-").replace("-", "-").split("-")
                            try:
                                myrange[0] = int(myrange[0][1:]) * 2080
                                myrange[1] = int(myrange[1][1:]) * 2080
                            except:
                                print("PASSED", myrange)
                            numericrange = myrange

                        else:
                            for sal in myrange:
                                #print(sal)
                                try:
                                    numericrange.append(int(sal[1:len(sal) - 1]) * 1000)
                                except:
                                    numericrange.append(int(sal[2:len(sal) - 1]) * 1000)

                    salary.append({
                      "text": i.get_text(separator=" ", strip=True),
                      "range": numericrange,

                    })

            # Get link to careers.govt.nz
            link = "https://www.careers.govt.nz" + card.find("h3", {"class": "title"}).find("a").get("href")


            data.append({
                "title": title,
                "subtitle": subtitle,
                "description": description,
                "opportunity": opportunity,
                "salary": salary,
                "link": link
            })




    return data




myArr = getProfiles()
json_object = json.dumps(myArr)

with open("profiles-3.json", "w") as outfile:
    outfile.write(json_object)

print(str(len(myArr)) + " job profiles succesfully dumped.")