[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href=https://github.com/blavian/FireMoney/blob/main/readme.md>
  </a>


  <p align="center">
   Fire Money
    <br />
    <a href=https://github.com/blavian/FireMoney/wiki><strong>Explore the wiki »</strong></a>
    <br />
    <br />



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Fire money is a personal finance app that is a clone of SplitWise, and inspired by Mint. Upon login,users will see the current month where they can view and create transactions. 

### Built With
 
* React
* Redux
* Python
* Flask
* JavaScript


<!-- GETTING STARTED -->
## Getting Started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/blavian/FireMoney.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/blavian/FireMoney.svg?style=for-the-badge
[contributors-url]: https://github.com/blavian/FireMoney/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/blavian/FireMoney.svg?style=for-the-badge
[forks-url]: https://github.com/blavian/FireMoney/network/members
[stars-shield]: https://img.shields.io/github/stars/blavian/FireMoney.svg?style=for-the-badge
[stars-url]: https://github.com/blavian/FireMoney/stargazers
[issues-shield]: https://img.shields.io/github/issues/blavian/FireMoney.svg?style=for-the-badge
[issues-url]: https://github.com/blavian/FireMoney/issues

