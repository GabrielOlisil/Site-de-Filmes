import { useEffect, useState } from "react";
import { API } from "../../api";
import { DiscoverSearch, Filme } from "../../interfaces/filme";
import styled from "styled-components";
import { StyledTypes } from "../../interfaces/styledTypes";
import { fileURLToPath } from "url";


const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";




const StyledDiscover = styled.main`
    background-color: ${({ theme }: StyledTypes) => theme.backgroundBase};


    .discover-container {
        max-width: 1500px;
        margin: 0 auto;

        
        

        article.discover-content {

            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            
            .discover-card {
                display: flex;
                margin: 10px 0;
                background-color: ${({ theme }: StyledTypes) => theme.backgroundLevel1};
                color: white;
                gap: 1rem;

                .discover-img{

                    flex: 1;
                    width: 100%;
                    img {
                        object-fit: contain;
                    }
                }

                .discover-information {
                    flex: 2;

                    .tags-info{
                        font-size: .8rem;
                        color: ${({theme} : StyledTypes) => theme.accentColor};
                        display: flex;
                        gap: 1rem;
                    }
                }
                
            }
        }

        
    }


`;

export default function Discover() {
    const [filmes, setFilmes] = useState<Filme[]>();
    const [page, setPage] = useState<number>(1);




    const load = async () => {
        const data: DiscoverSearch = await API.loadData(page);
        const filmes: Filme[] = data.results;

        const filmesFilter: Filme[] = filmes.filter((filme) => filme.backdrop_path);

        setFilmes(filmesFilter);
    }

    useEffect(() => {
        load();
        console.log(filmes)
    }, [page]);




    return (
        <StyledDiscover>
            <div className="discover-container">

                <article className="discover-content">
                    {filmes && filmes.map((filme: Filme, key: number) => {
                        return <div key={key}>



                            <div className="discover-card" >
                                <div className="discover-img">
                                    <img src={`${IMAGE_PATH}/${filme.poster_path}`} alt={`Poster do filme: ${filme.title}`} />
                                </div>
                                <div className="discover-information">
                                
                                    <h2>
                                        {filme.title}
                                    </h2>
                                    <div className="tags-info">
                                        <span>

                                            {filme.informations?.release_date}
                                        </span>

                                        <span className="tags">
                                            {[...filme.informations?.genres].slice(0,3).map((genero, key) =>{
                                                return <span key={key}>
                                                    {genero.name}
                                                </span>
                                            })}
                                        </span>
                                    </div>
                                    
                                    <div>
                                        <span>Dura????o: {Math.floor(filme.informations?.runtime / 60)}h{Math.floor(filme.informations?.runtime % 60 )}m.</span>
                                    </div>

                                    <div className="discover-flex">
                                    </div>

                                </div>



                            </div>



                        </div>
                    })}
                </article>
            </div>
        </StyledDiscover>
    )
}

