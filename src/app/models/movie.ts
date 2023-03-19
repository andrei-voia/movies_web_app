
//this is how  we define an interface object to be used
export interface Movie {

    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    revenue: number;
    runtime: number;
    status: string;
    genres: Genre[];
}

export interface Genre {
    it: number;
    name: string;
}

export interface MovieDto {

    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
}


//videos for the movies
export interface MovieVideo {
    site: string;
    key: string;
}

export interface MovieVideoDto {
    id: number;
    results: MovieVideo[];
}


//define all in one models without the Dto, just the needed values (backdrops is an array)
export interface MovieImages {

    backdrops: {
        file_path: string;
    }[];
}


export interface MovieCredits {
    cast: {
        name: string;
        profile_path: string;
    }[];
}
