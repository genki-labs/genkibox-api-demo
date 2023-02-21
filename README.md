# GenkiBox API Demo

<p align="center">
  <a href="https://api-docs.genki.io/">
      <img src="https://api-docs.genki.io/img/logo.svg" height="128">
  </a>
</link>

This project is an example that shows an easy way to integrate [GenkiBox API](https://api-docs.genki.io/) in your application.
- https://genkibox-api-demo-web.vercel.app/

Here is a video for the demo.

[![GenkiBox API Demo](https://res.cloudinary.com/marcomontalbano/image/upload/v1676906178/video_to_markdown/images/google-drive--1sbWaMecuomvmkEsD_47_vmyu4UflRabC-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://drive.google.com/file/d/1sbWaMecuomvmkEsD_47_vmyu4UflRabC/preview "GenkiBox API Demo")

## What is GenkiBox API?

GenkiBox APIs are a set of RESTful APIs that connect to GenkiBox data, which come with the following features.

### Easy to Use
GenkiBox APIs were designed from the ground up to be easily installed and used to get your campaign data and user data quickly.

### Focus on What Matters
GenkiBox APIs let you focus on your marketing campaigns, and we'll do the chores.

### Web 3.0 Support
GenkiBox APIs empower you to verify actions on blockchain and bring a new world of doing marketing campaigns.

## How to use GenkiBox API?
In this example, we built a user onboarding popup in PancakeSwap.

The campaign quest system is based on GenkiBox, so we're going to start from getting into the GenkiBox service.

### Step 1: Create an organization in GenkiBox

- Go to [GenkiBox Portal](https://beta-box.genki.io/portal).
- After connecting your wallet, you'll be asked to create an organization. You can add collaborators as organization members afterwards.
- Skip this step if you already have one.

### Step 2: Apply for an API key

- Please [apply one](https://api-docs.genki.io/getting-started/get-your-api-key) and get yourself an API key.
- Skip this step if you already have one.

### Step 3: Create a campaign with desired quests in GenkiBox

- Create a campaign for your application and set up the quests in GenkiBox.
- You will need the campaign ID and quest IDs to call the APIs. You can easily copy the IDs via the copy buttons next to the campaign name and the quest names.
- In this example, the quests are "Swap Token" and "Add Liquidity".

![img](./assets/copyID.png) 

### Step 4: Find the APIs you need

- There are 6 API endpoints in [GenkiBox API](https://api-docs.genki.io/api). Find the ones you need.
- In this example, we are going to use `Verify Action` and `Get User Status`.

![img](./assets/genkiAPI.png)

### Step 5: Use GenkiBox API in application

- After the user connects the wallet to your application, it calls `Get User Status` to retrieve the user status including the completion of each quest.
- When user clicks at the verify button, it calls `Verify Action` to trigger the on chain action verification in Genki's server, and then calls `Get User Status` again to update the user status.
- The source code locates in `apps/web/src/views/GenkiDemo/StepsPopup.tsx`.

## How to start this Demo

> Install dependencies using **yarn**

## `apps/web`
<details>

```sh
yarn
```

start the development server
```sh
yarn dev
```

build with production mode
```sh
yarn build

# start the application after build
yarn start
```
</details>

