**Introduction** 

[Blogify](https://blog-house.netlify.app/) is a blog platform for reading and writing blogs. Users can read, publish, edit, and delete blogs. Go ahead; create an account and share your wonderful ideas.

**IMPORTANT NOTE**

the live URL that is shared above might take time to response, you might need to wait up to 1 min, this is due to the fact that the backend host (Render) won't run the server when there is no traffic (free tier) and redeploys when needed.

**Running The App Locally**
1. Run [blog-backend](https://github.com/MohammadAl-khatib/blog-backend) locally.
2. Then run `npm i` to install dependencies.
4. Run `npm run dev`, localhost port is set to 3000.


**Project architecture**

This app represents the model and controller side of an MVC project, the view is a [NextJS app](https://github.com/MohammadAl-khatib/blog-frontend) that handles the user interface. Data flows from a MongoDB in the cloud through this app to the front end for rendering.

Choosing MVC design pattern would help us:
1. Maintain the project, as the business and data logic is encapsulated in the models, interaction between UI and the data layer is handled by the controllers, and the view would manage rendering the UI.
2. It is a common pattern, which makes it easier for other developers to get onboard.
3. Work can be split between teams.

*Note*: Didn't choose a monorepo as it becomes very large with time, the frontend part is large, so it has its own repo.

**CI/CD**

On each pull request, the flow would be as follows:
1. Running eslint, merge would be blocked in case failed.
2. Running unit test, merge would be blocked in case failed.
3. [Netlify](https://www.netlify.com/) would create a test link for each PR to be tested.
4. After acceptance from QA, the branch would be merged.
5. [Netlify](https://www.netlify.com/) is configured to re-deploy each time a commit is added to the main branch.

**Features**
1. SSR for better SEO and performance.
2. Kept a SPA functionality, which is something people might miss when doing SSR.
3. Responsive design, lower limit is 380px.
4. Lazy loading for some client components.

**Future Enhancements**
1. Refactor code to remove duplication.
2. Use variables for colors and fonts.
3. Modals should be modified, currently one modal handles everything.
4. Use custom hooks to minimize code in pages like edit and create.
5. Use oauth or other authentication service to register and authenticate users.