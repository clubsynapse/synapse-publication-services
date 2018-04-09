# synapse-publication-services
Synapse publication service


Global {.page-title}
======

### Members {.subsection-title}

#### (route) Add comment {#Add comment .name}

##### Route:

  Method   Path
  -------- -------------------------------
  POST     /publications/:pubID/comments

Add a comment to a publication

##### Body Parameters:

  Name      Type     Description
  --------- -------- ------------------------
  content   string   Content of the comment

##### Route Parameters:

  Name    Type     Description
  ------- -------- -----------------------
  pubID   string   ID of the publication

Source:
:   -   [app.js](app.js.html), [line 204](app.js.html#line204)

#### (route) Add observation to publication {#Add observation to publication .name}

##### Route:

  Method   Path
  -------- -----------------------------------
  POST     /publications/:pubID/observations

Add an observation of a publication

##### Body Parameters:

  Name      Type     Description
  --------- -------- ------------------------
  content   string   Content of observation

##### Route Parameters:

  Name    Type     Description
  ------- -------- -------------------
  pubID   string   ID of publication

Source:
:   -   [app.js](app.js.html), [line 288](app.js.html#line288)

#### (route) Add publication votes {#Add publication votes .name}

##### Route:

  Method   Path
  -------- ---------------
  POST     /votes/:pubID

Add a vote for a publication

##### Route Parameters:

  Name    Type     Description
  ------- -------- -----------------------
  pubID   string   ID of the publication

Source:
:   -   [app.js](app.js.html), [line 408](app.js.html#line408)

#### (route) Add report of publication {#Add report of publication .name}

##### Route:

  Method   Path
  -------- ------------------------------
  POST     /publications/:pubID/reports

Add a report of a publication

##### Body Parameters:

  Name      Type     Description
  --------- -------- -----------------------
  content   string   Content of the report

##### Route Parameters:

  Name    Type     Description
  ------- -------- -------------------
  pubID   string   ID of publication

Source:
:   -   [app.js](app.js.html), [line 316](app.js.html#line316)

#### (route) Adding new publication {#Adding new publication .name}

##### Route:

  Method   Path
  -------- ---------------
  POST     /publications

Add new publication

##### Body Parameters:

  Name      Type     Description
  --------- -------- -------------------------------------------
  title     string   Title of publication
  content   string   Content of publication
  themes    string   Array containing IDs of publication theme

Source:
:   -   [app.js](app.js.html), [line 66](app.js.html#line66)

#### (route) Adding new theme {#Adding new theme .name}

##### Route:

  Method   Path
  -------- --------
  POST     /theme

Add new theme

##### Body Parameters:

  Name          Type     Description
  ------------- -------- --------------------------
  title         string   Title of the theme
  description   string   Description of the theme

Source:
:   -   [app.js](app.js.html), [line 343](app.js.html#line343)

#### (route) Delete comment {#Delete comment .name}

##### Route:

  Method   Path
  -------- --------------------------------------
  DELETE   /publications/:pubID/comments/:comID

Delete a comment

##### Route Parameters:

  Name    Type     Description
  ------- -------- -----------------------
  pubID   string   ID of the publication
  comID   string   ID of the comment

Source:
:   -   [app.js](app.js.html), [line 261](app.js.html#line261)

#### (route) Delete publication {#Delete publication .name}

##### Route:

  Method   Path
  -------- ----------------------
  DELETE   /publications/:pubID

Delete a publication

##### Route Parameters:

  Name    Type     Description
  ------- -------- -------------------
  pubID   string   ID of publication

Source:
:   -   [app.js](app.js.html), [line 178](app.js.html#line178)

#### (route) Deleting a vote {#Deleting a vote .name}

##### Route:

  Method   Path
  -------- ---------------
  DELETE   /votes/:pubID

Delete a vote from a user for a publication

##### Route Parameters:

  Name    Type     Description
  ------- -------- -----------------------
  pubID   string   ID of the publication

Source:
:   -   [app.js](app.js.html), [line 432](app.js.html#line432)

#### (route) Get a publication {#Get a publication .name}

##### Route:

  Method   Path
  -------- ----------------------
  Get      /publications/:pubID

Get a publication

##### Route Parameters:

  Name    Type     Description
  ------- -------- -------------------
  pubID   string   ID of publication

Source:
:   -   [app.js](app.js.html), [line 134](app.js.html#line134)

#### (route) Get all reports of a publication {#Get all reports of a publication .name}

##### Route:

  Method   Path
  -------- ------------------------------
  GET      /publications/:pubID/reports

Get reports of a publication

##### Route Parameters:

  Name    Type     Description
  ------- -------- -------------------
  pubID   string   ID of publication

Source:
:   -   [app.js](app.js.html), [line 328](app.js.html#line328)

#### (route) Get commentq {#Get commentq .name}

##### Route:

  Method   Path
  -------- -------------------------------
  GET      /publications/:pubID/comments

Get all comments of a publication

##### Route Parameters:

  Name    Type     Description
  ------- -------- -----------------------
  pubID   string   ID of the publication

Source:
:   -   [app.js](app.js.html), [line 221](app.js.html#line221)

#### (route) Get observations of publication {#Get observations of publication .name}

##### Route:

  Method   Path
  -------- -----------------------------------
  POST     /publications/:pubID/observations

Get all observations of a publication

##### Route Parameters:

  Name    Type     Description
  ------- -------- -------------------
  pubID   string   ID of publication

Source:
:   -   [app.js](app.js.html), [line 301](app.js.html#line301)

#### (route) Get publication votes {#Get publication votes .name}

##### Route:

  Method   Path
  -------- ---------------
  GET      /votes/:pubID

Get all votes for a publication

##### Route Parameters:

  Name    Type     Description
  ------- -------- -----------------------
  pubID   string   ID of the publication

Source:
:   -   [app.js](app.js.html), [line 420](app.js.html#line420)

#### (route) Get user votes {#Get user votes .name}

##### Route:

  Method   Path
  -------- --------
  GET      /votes

Get all vote of user

Source:
:   -   [app.js](app.js.html), [line 446](app.js.html#line446)

#### (route) Getting all publications {#Getting all publications .name}

##### Route:

  Method   Path
  -------- ---------------
  string   /publications

Get all publications (with optional theme and keyword parameter)

##### Body Parameters:

  Name      Type     Description
  --------- -------- -----------------------------------------------
  theme     string   ID of theme related to publications(optional)
  keyword   string   Keyword to search in publication(optional

##### Query Parameters:

  Name      Type     Description
  --------- -------- -----------------------------------------------
  theme     string   ID of theme related to publications(optional)
  keyword   string   Keyword to search in publication(optional)

Source:
:   -   [app.js](app.js.html), [line 88](app.js.html#line88)

#### (route) Getting theme list {#Getting theme list .name}

##### Route:

  Method   Path
  -------- --------
  GET      /theme

Get all themes from database

##### Response:

  Name   Type     Description
  ------ -------- -------------------------------------------------
  List   Array.   of theme objects with id, title and description

Source:
:   -   [app.js](app.js.html), [line 361](app.js.html#line361)

#### (route) Uodate comment {#Uodate comment .name}

##### Route:

  Method   Path
  -------- --------------------------------------
  PUT      /publications/:pubID/comments/:comID

Update a comment

##### Body Parameters:

  Name      Type     Description
  --------- -------- ------------------------
  content   string   Content of the comment

##### Route Parameters:

  Name    Type     Description
  ------- -------- -----------------------
  pubID   string   ID of the publication
  comID   string   ID of the comment

Source:
:   -   [app.js](app.js.html), [line 234](app.js.html#line234)

#### (route) Update publication {#Update publication .name}

##### Route:

  Method   Path
  -------- ----------------------
  PUT      /publications/:pubID

Update a publication

##### Body Parameters:

  Name      Type     Description
  --------- -------- ----------------------------
  title     string   New title of publication
  content   string   New content of publication

##### Route Parameters:

  Name    Type     Description
  ------- -------- -------------------
  pubID   string   ID of publication

Source:
:   -   [app.js](app.js.html), [line 150](app.js.html#line150)

#### (route) Updating theme {#Updating theme .name}

##### Route:

  Method   Path
  -------- -----------------
  PUT      /theme/:themeID

Update a theme

##### Body Parameters:

  Name          Type     Description
  ------------- -------- --------------------------
  title         string   New title of theme
  description   string   New description of theme

Source:
:   -   [app.js](app.js.html), [line 381](app.js.html#line381)

### Methods {.subsection-title}

#### QueryResult(result, res) {#QueryResult .name}

Process query result for database modifications

##### Parameters:

  Name       Type     Description
  ---------- -------- ----------------------------
  `result`   object   Result object of the query
  `res`      object   Http response object

Source:
:   -   [app.js](app.js.html), [line 22](app.js.html#line22)

[Home](index.html)
------------------

### Global

-   [Add comment](global.html)
-   [Add observation to publication](global.html)
-   [Add publication votes](global.html)
-   [Add report of publication](global.html)
-   [Adding new publication](global.html)
-   [Adding new theme](global.html)
-   [Delete comment](global.html)
-   [Delete publication](global.html)
-   [Deleting a vote](global.html)
-   [Get a publication](global.html)
-   [Get all reports of a publication](global.html)
-   [Get commentq](global.html)
-   [Get observations of publication](global.html)
-   [Get publication votes](global.html)
-   [Get user votes](global.html)
-   [Getting all publications](global.html)
-   [Getting theme list](global.html)
-   [QueryResult](global.html#QueryResult)
-   [Uodate comment](global.html)
-   [Update publication](global.html)
-   [Updating theme](global.html)

\