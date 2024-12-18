import styled from "styled-components";
import { useEffect, useState } from "react";
import { fetchTopHeadlines } from "../api/newsAPi.ts";
import Carousel from "../components/Carousel.tsx";
import NewsCardHorizontal from "../components/newsCardHorizontal.tsx";

//BreakPoints
const sizes = {
  desktop: "1024px",
  tablet: "1000px",
  mobile: "480px",
};

const media = {
  desktop: `(max-width: ${sizes.desktop})`,
  tablet: `(max-width: ${sizes.tablet})`,
  mobile: `(max-width: ${sizes.mobile})`,
};

const Home = () => {
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [otherNews, setOtherNews] = useState([]);

  useEffect(() => {
    const getTopHeadlines = async () => {
      try {
        const result = await fetchTopHeadlines("US", 50);
        const filteredHeadlines = result.articles.filter(
          (article: { title: string }) => !article.title.startsWith("[Removed]")
        );

        setTopHeadlines(filteredHeadlines.slice(0, 10)); // Top 10 headlines
        setOtherNews(filteredHeadlines.slice(10)); // Remaining articles
      } catch (e) {
        console.error(e);
      }
    };

    getTopHeadlines();
  }, []);

  return (
    <HomeContainer>
      <div className="TrendingNewsContainer">
        {topHeadlines.length > 0 ? (
          <Carousel articles={topHeadlines} />
        ) : (
          <p>Loading top articles...</p>
        )}
      </div>
      <div className="OtherNews">
        {otherNews.map((article, index) => (
          <NewsCardHorizontal article={article} key={index} />
        ))}
      </div>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  padding: 20px 15%;

  @media ${media.mobile} {
    padding: 10px 5%;
  }

  .TrendingNewsContainer {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    @media ${media.mobile} {
      height: 300px;
    }
  }

  .OtherNews {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Adds spacing between news cards */
  }
`;

export default Home;
