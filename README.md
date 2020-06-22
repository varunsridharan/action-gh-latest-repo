<p align="center"><img src="https://cdn.svarun.dev/gh/actions.png" width="150px"/></p>

# GH Latest Repo - ***Github Action***
Github Action That Provides Latest Public GitHub Repos From A User

## ⚙️ Configuration
| Argument | Default | Description |
| -------- |  :---:  | ----------- |
| `GITHUB_USERNAME` | **NULL** | Provide A Valid Github Username To Fetch Latest Repo |
| `MAX_REPOS` | **6** | Number Of Latest Repo To Fetch And Provide As JSON |
| `GH_TOKEN` | **NULL** | Github Personal Access Token |
| `SAVE_LOCATION` | **/** | Path To Save The ***JSON*** File |
| `FILE_NAME` | **repos.json** | Custom Option To Set A Custom FILE NAME | 

---

### [Github Personal Token](https://github.com/settings/tokens/new?description=gh-latest-repos)  <small> Is required with the below scope </small>

> ![https://cdn.svarun.dev/gh/varunsridharan/action-gh-latest-repo/scope.png](https://cdn.svarun.dev/gh/varunsridharan/action-gh-latest-repo/scope.png)

#### [Click Here To Generate A Token](https://github.com/settings/tokens/new?description=gh-latest-repos)

---

## 🚀 Usage

### 1. Using It With Master Branch
* Step1 : Create A File Named **gh-latest-repo.yml** in `/.github/workflows/`
* Step2 : Copy & Paste The Below Content In That File
```yml
name: ON_PUSH

on:
  schedule:
    - cron: '*/60 * * * *'

jobs:
  GH_Latest_Repo:
    runs-on: ubuntu-latest
    steps:
      - name: 📩 Fetching Repository
        uses: actions/checkout@v2
      - name: 📝 Generating JSON
        uses: varunsridharan/action-gh-latest-repo@master
        with:
          GH_TOKEN: ${{secrets.GH_TOKEN}}
          GITHUB_USERNAME: "varunsridharan"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```


### 2. Using It With Custom/GH-PAGES Branch
* Step1 : Create the branch you need.
* Step2 : Create A File Named **gh-latest-repo.yml** in `/.github/workflows/` in MASTER BRANCH
* Step3 : Copy & Paste The Below Content In That File
```yml
name: ON_PUSH

on:
  schedule:
    - cron: '*/60 * * * *'

jobs:
  GH_Latest_Repo:
    runs-on: ubuntu-latest
    steps:
      - name: 📩 Fetching Repository
        uses: actions/checkout@v2
        with:
          ref: 'your-branch-here'
      - name: 📝 Generating JSON
        uses: varunsridharan/action-gh-latest-repo@master
        with:
          GH_TOKEN: ${{secrets.GH_TOKEN}}
          GITHUB_USERNAME: "varunsridharan"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 🤔 Inspired By <small>[Sindre Sorhus][sindresorhus/gh-latest-repos]<small>
First when i saw his website i was so confused on how he was able to fetch the latest github repo via the domain `https://gh-latest-repos.now.sh/`
& Also i never heared of the domain `.now.sh` 

So i was trying to figure on where i can purchase and after going through lots of Website's i somehow, ended here
[sindresorhus/gh-latest-repos](https://github.com/sindresorhus/gh-latest-repos) 

That's when i found out `.now.sh` is domain provided by [https://vercel.com](https://vercel.com) and its FREE!!!
 
So you guessed it. I jumped right into it and tried to get it up & Running. 
But I failed and was not able to get it since i am not that familiar with it.

#### Well Finally Got it Working Using None Other Than Github Actions 😀 😉
Since i am familiar ***Github Actions*** i decided to convert his script into a ***Action Package*** 



>  Thanks To Sindre Sorhus For Creating Such Wonderful Microservice

---

## 🤝 Contributing
If you would like to help, please take a look at the list of [issues](issues/) or the [To Do](#-todo) checklist.

## 📝 License
This project is licensed under **General Public License v3.0 license**. See the [LICENSE](LICENSE) file for more info.

## 📣 Feedback
If you find it useful, let me know :wink:

- Create An [🔧 Issue](issues/) 
- Contact me on [🐦 Twitter][twitter] 
- Send An [📧 E-Mail][email].

## 🙏  Supports
Built With  ♥️By _[Varun Sridharan][twitter]_

🌟 This repository if this project helped you!

## Powered by
| [![DigitalOcean][do-image]][do-ref] | [![JetBrains][jb-image]][jb-ref] |
| --- | --- |


[twitter]: https://go.svarun.dev/sm/twitter/
[email]: https://go.svarun.dev/contact/email/
[website]: https://go.svarun.dev/website/
[do-ref]: https://go.svarun.dev/powered/digitalocean/
[jb-ref]: https://go.svarun.dev/powered/jetbrains/

[do-image]: https://cdn.svarun.dev/common/digitalocean/small.png?v=1
[jb-image]: https://cdn.svarun.dev/common/jetbrains/phpstorm/small.png?v=1
[sindresorhus/gh-latest-repos]: https://github.com/sindresorhus/gh-latest-repos