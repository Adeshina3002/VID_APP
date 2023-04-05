# VID APP - movie rental project

## It is an application service for renting out movies

### Home or root route:
https://vidapp-project.up.railway.app/api

#### Customer route:
GET ALL CUSTOMERS: https://vidapp-project.up.railway.app/api/v1/customers
GET A CUSTOMER: https://vidapp-project.up.railway.app/api/v1/customers/:id
POST A CUSTOMER: https://vidapp-project.up.railway.app/api/v1/customers/signup
UPDATE A CUSTOMER: https://vidapp-project.up.railway.app/api/v1/customers/:id
DELETE A CUSTOMER: https://vidapp-project.up.railway.app/api/v1/customers/:id 

#### Genre routes
GET ALL GENRES: https://vidapp-project.up.railway.app/api/v1/genres
GET A GENRE: https://vidapp-project.up.railway.app/api/v1/genres/:id
POST A GENRE: https://vidapp-project.up.railway.app/api/v1/genres/:movieId
UPDATE A GENRE: https://vidapp-project.up.railway.app/api/v1/genres/:id
DELETE A GENRE: https://vidapp-project.up.railway.app/api/v1/genres/:id

#### Movies routes
GET ALL MOVIES: https://vidapp-project.up.railway.app/api/v1/movies
GET A MOVIE: https://vidapp-project.up.railway.app/api/v1/movies/:id
POST A MOVIE: https://vidapp-project.up.railway.app/api/v1/movies/
UPDATE A MOVIE: https://vidapp-project.up.railway.app/api/v1/movies/:id
DELETE A MOVIE: https://vidapp-project.up.railway.app/api/v1/movies/:id

#### Rentals routes
GET ALL RENTALS: https://vidapp-project.up.railway.app/api/v1/rentals
GET A RENTAL: https://vidapp-project.up.railway.app/api/v1/rentals/:id
POST A RENTAL: https://vidapp-project.up.railway.app/api/v1/rentals/:movieId/:customerId
UPDATE A RENTAL: https://vidapp-project.up.railway.app/api/v1/rentals/:movieId/:customerId
DELETE A RENTAL: https://vidapp-project.up.railway.app/api/v1/rentals