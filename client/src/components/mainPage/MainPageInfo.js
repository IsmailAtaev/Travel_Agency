import React from "react";
import "./mainPage.css";
import Egypt from "../../assets/i1.jpg";
import istanbul from "../../assets/piter.jpg";
import m from "../../assets/t1.png";
import maldives from "../../assets/Switzerland.png";
import maldive from "../../assets/maldive.jpg";
import Ashgabat from "../../assets/a2.jpg";

const MainPageInfo = () => {
  return (
    <div>
      <section class="light">
        <div class="container py-2">
          <article class="postcard light blue">
            <a class="postcard__img_link" href="#">
              <img class="postcard__img" src={Ashgabat} alt="Image Title" />
            </a>
            <div class="postcard__text t-dark">
              <h1 class="postcard__title blue">
                <a href="#">Ашхабад беломраморный город</a>
              </h1>
              <div class="postcard__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25 2023
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, fugiat asperiores inventore beatae accusamus odit
                minima enim, commodi quia, doloribus eius! Ducimus nemo
                accusantium maiores velit corrupti tempora reiciendis molestiae
                repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi,
                illum quos!
              </div>
            </div>
          </article>
          <article class="postcard light red">
            <a class="postcard__img_link" href="#">
              <img class="postcard__img" src={istanbul} alt="Image Title" />
            </a>
            <div class="postcard__text t-dark">
              <h1 class="postcard__title red">
                <a href="#">Санкт-Петербург</a>
              </h1>
              <div class="postcard__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, fugiat asperiores inventore beatae accusamus odit
                minima enim, commodi quia, doloribus eius! Ducimus nemo
                accusantium maiores velit corrupti tempora reiciendis molestiae
                repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi,
                illum quos!
              </div>
            </div>
          </article>
          <article class="postcard light green">
            <a class="postcard__img_link" href="#">
              <img class="postcard__img" src={Egypt} alt="Image Title" />
            </a>
            <div class="postcard__text t-dark">
              <h1 class="postcard__title green">
                <a href="#">Стамбул</a>
              </h1>
              <div class="postcard__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, fugiat asperiores inventore beatae accusamus odit
                minima enim, commodi quia, doloribus eius! Ducimus nemo
                accusantium maiores velit corrupti tempora reiciendis molestiae
                repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi,
                illum quos!
              </div>
            </div>
          </article>
          <article class="postcard light yellow">
            <a class="postcard__img_link" href="#">
              <img class="postcard__img" src={m} alt="Image Title" />
            </a>
            <div class="postcard__text t-dark">
              <h1 class="postcard__title yellow">
                <a href="#">Япония Гора Фудзияма</a>
              </h1>
              <div class="postcard__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, fugiat asperiores inventore beatae accusamus odit
                minima enim, commodi quia, doloribus eius! Ducimus nemo
                accusantium maiores velit corrupti tempora reiciendis molestiae
                repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi,
                illum quos!
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default MainPageInfo;
