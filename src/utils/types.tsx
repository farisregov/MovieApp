export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  genre_ids: number[];
  genres: Genre[];

  popularity: number;
  release_date: string;
  runtime: number;

  status: string;

  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MoviesResponse {
  dates?: Dates;
  page: number;
  results: Movie[];
  cast: Movie[];
  total_pages: number;
  total_results: number;
}
export interface MoviesProps {
  title?: string;

  data: MoviesResponse | null;
  hideSeeAll?: boolean;
}
export interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}
export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path?: string;
  rating?: number;
}

export interface ReviewResponse {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}
export interface ReviewProps {
  data: ReviewResponse | null;
}

//UPCOMING TYPES
// export interface UpcomingMoviesResponse {
//   dates: Dates;
//   page: number;
//   results: UpcomingMovies[];
//   cast: TopRatedMovies[];

//   total_pages: number;
//   total_results: number;
// }

export interface Dates {
  maximum: string;
  minimum: string;
}

// export interface UpcomingMovies {
//   adult: boolean;
//   backdrop_path: string;
//   genre_ids: number[];
//   id: number;
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   release_date: string;
//   title: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// }
// export interface UpcomingMoviesProps {
//   title: string;
//   data: UpcomingMoviesResponse | null;
//   hideSeeAll?: boolean;
// }

//TOPRATED TYPES

// export interface TopRatedMoviesResponse {
//   page: number;
//   results: TopRatedMovies[];
//   cast: TopRatedMovies[];
//   total_pages: number;
//   total_results: number;
// }

// export interface TopRatedMovies {
//   adult: boolean;
//   backdrop_path: string;
//   genre_ids: number[];
//   id: number;
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   release_date: string;
//   title: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// }

// export interface TopRatedMoviesProps {
//   title: string;
//   data: TopRatedMoviesResponse | null;
//   hideSeeAll?: boolean;
// }

export interface MovieCardProps {
  item: Movie;
  onPress: (item: Movie) => {};
} // for trendingMovies

//Movies Details
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

//CastDetails

export interface MovieCast {
  id: number;
  cast: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
  place_of_birth?: string;
  birthday?: string;
  biography?: string;
}

export interface MovieCastProps {
  cast: Cast[] | null;
  navigation: any;
}
