# [country] talk

## a place for communities of your country

### project info

**Stack:**

- Next.js # Frontend and Backend api
- Supabase # Database and Auth

**Folder Structure:**

    .
    ├── public                      # static build files
    ├── src                         # project source code
    │   ├── __tests__               # unit tests
    │   ├── assets                  # all constant data (constants, fonts, icons, images, markdown, mocks)
    │   ├── base                    # base behaviour of the app
    │   │   ├── config              # any service configuration
    │   │   ├── styles              # global styles, css-variables, media queries, typography
    │   │   ├── types               # extending existing types, or adding global types
    │   │   ├── utils               # useful functionalities shared in app (window size, user scroll)
    │   │   ├── helpers             # short functions (is browser, cuting strings)
    │   │   ├── lib                 # all the database functionality (getting data, subscribing for realtime)
    │   │   └── hooks               # reusable react hooks
    │   ├── components
    │   │   ├── elements            # all components that are used at least twice
    │   │   ├── layouts             # all layout-related components
    │   │   ├── sections            # pages' sections equivalent (components used once should be nested in it's parent)
    │   │   └── templates           # templates for pages
    │   └── pages
    │       ├── api                 # api routes
    │       │   └── auth            # auth related route (currently using [...supabase].ts)
    │       ├── app                 # application pages (community, rooms, posts)
    |       |   └── index.tsx       # homepage of the app (community showcase)
    │       ├── _app.tsx            # page initializer
    │       ├── index.tsx           # landing page of the company
    │       ├── login.tsx           # login page
    │       └── signup.tsx          # signup page
    ├── README.md                   # project docs
    └── ...
