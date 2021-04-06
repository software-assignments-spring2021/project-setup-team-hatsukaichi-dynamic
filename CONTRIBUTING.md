# Guide to Contributing

Thank you for contributing to TV Tracker. If you're interested in helping out, please submit a pull request. We would urge you to follow the following norms:

##  Pull Request Process & Git Workflow

0. Make a branch for each task. Branches should be named with the following format: issue#-description-of-task.

1. Name your PR with a focus on accuracy and brevity  and write a description of the task your PR accomplishes, linking to an issue if possible.

2. [Stick to Semantic Versioning](http://semver.org/).

3. Pull and resolve changes before making your PR.

4. Wait for another developer to approve your PR before merging.

5. Squash and merge into master (squash for the sake of neatness).

When reviewing others' PRs, only leave comments and suggestions on what to change. Do not merge others' PRs for them unless asked.

## Code of Conduct and Team Norms

Our project is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion (or lack thereof), or technology choices. We do not tolerate harassment of participants in any form. Sexual language and imagery is not appropriate. Participants violating these rules may be sanctioned or expelled. 

Harassment includes offensive verbal comments related to gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion, technology choices, sexual images in public spaces, deliberate intimidation, stalking, following, harassing photography or recording, sustained disruption of talks or other events, inappropriate physical contact, and unwelcome sexual attention.

Participants asked to stop any harassing behavior are expected to comply immediately.

If a participant engages in harassing behavior, the lead developers may take any action they deem appropriate, including warning the offender or expulsion from the project.

If you are being harassed, notice that someone else is being harassed, or have any other concerns, please contact a member of the team immediately.

Adapted from [Conference Code of Conduct](https://confcodeofconduct.com).

If you have to miss a Standup, please provide notice in Slack in advance. Try not to miss any Standups you don't have to.

For our purposes, "done" means a task meets acceptance criteria if those exist or it has been merged into the master branch.


## Standup Times

We hold Standup meetings every Monday, Wednesday, and Friday at 10:30 AM ET in [this Discord server](https://discord.gg/Dnna2SQsAA).
Additional meetings will be scheduled as needed.


## Conflict Resolution

In the event of a conflict, please be honest and transparent. Avoiding talking about an issue can only serve to prolong or amplify it. If it's a minor issue, consider bringing it up in the slack. For more significant disagreements, we can schedule a full voice conversation to discuss the issue and resolve it amicably. In the event of a disagreement about implementation or project direction, ultimately, the majority will rule. Worst comes to worst, we will contact the Professor or tutors to help resolve the conflict.


## Local Development

Clone the repository through the command line or through Visual Studio.

For the front-end, navigate to the front-end folder and run `npm start` in the command line. Make sure the proper packages are installed with `npm install` (also run in the front-end folder).

## Building and Testing

### Trakt API

To use Trakt API, you need to register for an account and create a Trakt App. 
1. Register for an account [here](https://login.apiary.io/register).
2. Create a new Trakt API app [here](https://trakt.tv/oauth/applications/new) to have 
your own ``client_id`` and ``client_secret``. <br>
For ``Name``, enter your project name (e.g. *TV Tracker*). <br>
For ``Description`` enter description for the project (e.g. *App allows to retrieve information about trending shows and store it*). <br>
For ``Redirect uri``, enter `urn:ietf:wg:oauth:2.0:oob`. <br>
Leave the rest empty and click on ``SAVE APP``. <br>
You can now use ``client_id`` and ``client_secret`` for making Trakt API calls. More information about Trakt API required headers is available [here](https://trakt.docs.apiary.io/#introduction/required-headers). 
3. To create Oauth, please follow these instructions [here](https://github.com/xbgmsharp/trakt#usage). Note: for Sprint 2, Oauth will not be needed. 
4. In your .env file, add the following line: 

> API_KEY_TRAKT=your_client_id

For example, if your client id is 123456, the file would read:

> API_KEY_TRAKT=123456

### TMDb API Setup

To use TMDb API to retrieve poster information for movies and shows, you need to register for an account. 
1. Register for an account [here](https://www.themoviedb.org/signup).
2. Go to 'Profile and Settings tab' and navigate to the API tab [here](https://www.themoviedb.org/settings/api).
3. Click 'Request an API key' and accept the terms. 
4. Create an application by filling out the details of your app. <br>
For ``Application URL``, if URL is not yet available, type `not yet available`.
You can now use your API Key (v3 auth).
5. In your .env file, add the following line: 

> API_KEY_TMDB=your_api_key(v3 auth)

For example, if your api key is 123456, the file would read:

> API_KEY_TMDB=123456
