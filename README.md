# synapse-publication-services
Synapse publication service


(route) Add comment
Route:
Method	Path
POST 	/publications/:pubID/comments
Add a comment to a publication
Body Parameters:
Name 	Type 	Description
content 	string 	Content of the comment
Route Parameters:
Name 	Type 	Description
pubID 	string 	ID of the publication



(route) Add observation to publication
Route:
Method	Path
POST 	/publications/:pubID/observations
Add an observation of a publication
Body Parameters:
Name 	Type 	Description
content 	string 	Content of observation
Route Parameters:
Name 	Type 	Description
pubID 	string 	ID of publication


(route) Add publication votes
Route:
Method	Path
POST 	/votes/:pubID
Add a vote for a publication
Route Parameters:
Name 	Type 	Description
pubID 	string 	ID of the publication



(route) Add report of publication
Route:
Method	Path
POST 	/publications/:pubID/reports
Add a report of a publication
Body Parameters:
Name 	Type 	Description
content 	string 	Content of the report
Route Parameters:
Name 	Type 	Description
pubID 	string 	ID of publication



(route) Adding new publication
Route:
Method	Path
POST 	/publications
Add new publication
Body Parameters:
Name 	Type 	Description
title 	string 	Title of publication
content 	string 	Content of publication
themes 	string 	Array containing IDs of publication theme


(route) Adding new theme
Route:
Method	Path
POST 	/theme
Add new theme
Body Parameters:
Name 	Type 	Description
title 	string 	Title of the theme
description 	string 	Description of the theme



(route) Delete comment
Route:
Method	Path
DELETE 	/publications/:pubID/comments/:comID
Delete a comment
Route Parameters:
Name 	Type 	Description
pubID 	string 	ID of the publication
comID 	string 	ID of the comment


(route) Delete publication
Route:
Method	Path
DELETE 	/publications/:pubID
Delete a publication
Route Parameters:
Name 	Type 	Description
pubID 	string 	ID of publication



(route) Deleting a vote
Route:
Method	Path
DELETE 	/votes/:pubID
Delete a vote from a user for a publication
Route Parameters:
Name 	Type 	Description
pubID 	string 	ID of the publication


(route) Get a publication
Route:
Method	Path
Get 	/publications/:pubID
Get a publication
Route Parameters:
Name 	Type 	Description
pubID 	string 	ID of publication


(route) Get all reports of a publication
Route:
Method	Path
GET 	/publications/:pubID/reports
Get reports of a publication
Route Parameters:
Name 	Type 	Description
pubID 	string 	ID of publication



(route) Get commentq
Route:
Method	Path
GET 	/publications/:pubID/comments
Get all comments of a publication
Route Parameters:
Name 	Type 	Description
pubID 	string 	ID of the publication



(route) Get observations of publication
Route:
Method	Path
POST 	/publications/:pubID/observations
Get all observations of a publication
Route Parameters:
Name 	Type 	Description
pubID 	string 	ID of publication


(route) Get publication votes
Route:
Method	Path
GET 	/votes/:pubID
Get all votes for a publication
Route Parameters:
Name 	Type 	Description
pubID 	string 	ID of the publication



(route) Get user votes
Route:
Method	Path
GET 	/votes
Get all vote of user



(route) Getting all publications
Route:
Method	Path
string 	/publications
Get all publications (with optional theme and keyword parameter)
Body Parameters:
Name 	Type 	Description
theme 	string 	ID of theme related to publications(optional)
keyword 	string 	Keyword to search in publication(optional
Query Parameters:
Name 	Type 	Description
theme 	string 	ID of theme related to publications(optional)
keyword 	string 	Keyword to search in publication(optional)



(route) Getting theme list
Route:
Method	Path
GET 	/theme
Get all themes from database
Response:
Name 	Type 	Description
List 	Array. 	of theme objects with id, title and description


(route) Uodate comment
Route:
Method	Path
PUT 	/publications/:pubID/comments/:comID
Update a comment
Body Parameters:
Name 	Type 	Description
content 	string 	Content of the comment
Route Parameters:
Name 	Type 	Description
pubID 	string 	ID of the publication
comID 	string 	ID of the comment


(route) Update publication
Route:
Method	Path
PUT 	/publications/:pubID
Update a publication
Body Parameters:
Name 	Type 	Description
title 	string 	New title of publication
content 	string 	New content of publication
Route Parameters:
Name 	Type 	Description
pubID 	string 	ID of publication



(route) Updating theme
Route:
Method	Path
PUT 	/theme/:themeID
Update a theme
Body Parameters:
Name 	Type 	Description
title 	string 	New title of theme
description 	string 	New description of theme



Methods
QueryResult(result, res)
Process query result for database modifications
Parameters:
Name 	Type 	Description
result 	object 	Result object of the query
res 	object 	Http response object

