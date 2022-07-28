import React, { useContext, useEffect } from "react";
import {
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Slider,
  Pagination,
} from "@mui/material";
import { ClientContext } from "../contexts/ClientProvider";

function MainPage() {
  const {
    getWatches,
    watches,
    filterByPrice,
    setfilterByPrice,
    pagesCount,
    currentPages,
    setCurrentPage,
    addWatchToBasket,
  } = useContext(ClientContext);

  useEffect(() => {
    getWatches();
  }, [filterByPrice, currentPages]);

  return (
    <div className="main-page">
      <Container>
        <h2>Весь каталог часов</h2>
        <div className="filter-block">
          <div>
            <h4>Фильтрация по цене</h4>
            <Slider
              value={filterByPrice}
              onChange={(_, newValue) => setfilterByPrice(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={9999}
            />
          </div>
        </div>
        <div className="products">
          {watches.map((item) => (
            <Card key={item.id} className="products-card">
              <CardMedia component="img" height="140" image={item.photo} />
              <CardContent>
                <Typography
                  className="products-card-title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {item.name}
                </Typography>
                <ul className="products-card-ul">
                  <li>
                    <span>Бренд:</span>
                    <span>{item.brand}</span>
                  </li>
                  <li>
                    <span>Дата выпуска:</span>
                    <span>{item.year}</span>
                  </li>
                  <li>
                    <span>Страна производства:</span>
                    <span>{item.country}</span>
                  </li>
                  <li>
                    <span>Цена:</span>
                    <span>{item.price} $</span>
                  </li>
                </ul>
                <Button
                  onClick={() => addWatchToBasket(item)}
                  variant="outlined"
                >
                  Добавить в корзину
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="pagination-block">
          <Pagination
            onChange={(_, newValue) => setCurrentPage(newValue)}
            variant="outlined"
            shape="rounded"
            count={pagesCount}
          />
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
