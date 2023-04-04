# VID APP - movie rental project

## It is an application service for renting out movies

### Home or root route:
https://vidapp-project.up.railway.app/api

#### Customer route:
GET ALL CUSTOMERS: https://vidapp-project.up.railway.app/api/customers
GET A CUSTOMER: https://vidapp-project.up.railway.app/api/customers/:id
POST A CUSTOMER: https://vidapp-project.up.railway.app/customers/signup
UPDATE A CUSTOMER: https://vidapp-project.up.railway.app/api/customers/:id
DELETE A CUSTOMER: https://vidapp-project.up.railway.app/api/customers/:id 

#### Genre routes
GET ALL GENRES: https://vidapp-project.up.railway.app/api/genres
GET A GENRE: https://vidapp-project.up.railway.app/api/genres/:id
POST A GENRE: https://vidapp-project.up.railway.app/api/genres/:movieId
UPDATE A GENRE: https://vidapp-project.up.railway.app/api/genres/:id
DELETE A GENRE: https://vidapp-project.up.railway.app/api/genres/:id

#### Movies routes
GET ALL MOVIES: https://vidapp-project.up.railway.app/api/movies
GET A MOVIE: https://vidapp-project.up.railway.app/api/movies/:id
POST A MOVIE: https://vidapp-project.up.railway.app/api/movies/
UPDATE A MOVIE: https://vidapp-project.up.railway.app/api/movies/:id
DELETE A MOVIE: https://vidapp-project.up.railway.app/api/movies/:id

#### Rentals routes
GET ALL RENTALS: https://vidapp-project.up.railway.app/api/rentals
GET A RENTAL: https://vidapp-project.up.railway.app/api/rentals/:id
POST A RENTAL: https://vidapp-project.up.railway.app/api/rentals/:movieId/:customerId
UPDATE A RENTAL: https://vidapp-project.up.railway.app/api/rentals/:movieId/:customerId
DELETE A RENTAL: https://vidapp-project.up.railway.app/api/rentals