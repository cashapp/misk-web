# [Recommended Workflow](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/)

  1. Fork into your personal Github account
  1. Clone repo from your fork
  1. Add cashapp as a remote with `git remote add cashapp git@github.com:cashapp/misk-web.git`
  1. Pull any new changes with `git pull cashapp master`
  1. Push any new changes to a new branch in your personal fork
  1. Open PR from personal fork -> cashapp/master
