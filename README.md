# Vaksin Untuk Rakyat - Frontend

##### Frontend Client untuk Capstone Project Kelompok 30 - Vaccine App

![cover](https://i.ibb.co/6BJbCF3/Figma-Cover.png)

# Demo

 [Demo Link](https://vaksinasi.obi.codes)

# Tech Stack

![tailwindcss](https://badges.aleen42.com/src/tailwindcss.svg) ![react](https://badges.aleen42.com/src/react.svg) ![vite](https://badges.aleen42.com/src/vitejs.svg) ![vscode](https://badges.aleen42.com/src/visual_studio_code.svg) ![javascript](https://badges.aleen42.com/src/javascript.svg)

## Authors

- [@agusjanardana](https://www.github.com/agusjanardana) - Agus Janardana
- [@enjinerd](https://www.github.com/enjinerd) - Roni Ardiyanto
- [@yustinayasin](https://www.github.com/yustinayasin) - Yustina Yasin

## Environment Variables

To run this project, you will need to add the following environment variables to your **.env** file and **.env.local**

`VITE_API_HOST` : REST API Host for Vaccination Backend

## Run Locally

Clone the project

```bash
  git clone https://github.com/yustinayasin/final-project-frontend.git
```

Go to the project directory

```bash
  cd final-project-frontend
```

Install dependencies

```bash
  yarn
```

Add **.env.local**

Start the server

```bash
  yarn dev --host
```

## Command

**To start development server and expose dev url to same network / LAN**

```bash
  yarn dev --host
```

**To commit using commitizen with emoji support**

```bash
  yarn commit
```

**format code using prettier**

```bash
  yarn pretty #Only staged file
  yarn pretty:all #Format all file
```

**Linter**

```bash
  yarn lint
```

## Notes

We using **husky** to lint and format code when commit is triggered
