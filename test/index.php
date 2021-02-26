<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>test vnet-dom3</title>
    <link rel="stylesheet" href="/css/main.min.css">
</head>

<body>
    <div class="other-div"></div>

    <div class="site-wrap">

        <header class="header">

        </header>

        <main class="main">
            <section class="section slider-section">
                <div class="container">
                    <h2 class="section-title">DOM toggle slide</h2>
                    <a href="#" class="js-toggle-slide">toggle slider</a>
                    <div class="slide some-class other-class third-class" style="transition-duration: 1s; overflow: hidden">
                        <?php
                        for ($i = 0; $i < 10; $i++) {
                        ?>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ducimus consequatur fugiat consectetur aut voluptate eum quo distinctio praesentium soluta et repellat, ut modi labore porro dolor! Vitae, repudiandae qui.
                        <?php
                        }
                        ?>
                    </div>
                </div>
            </section>


            <section class="section section-tabs">
                <div class="container">
                    <h2 class="section-title">DOM tabs</h2>
                    <div class="tabs-row js-dom-tabs translate-tabs">
                        <div class="tabs-nav">
                            <div class="tab-nav-col">
                                <a href="#" class="tab-link active" data-target="infoTab">Характеристики</a>
                            </div>
                            <div class="tab-nav-col">
                                <a href="#" class="tab-link" data-target="descTab">Описание</a>
                            </div>
                            <div class="tab-nav-col">
                                <a href="#" class="tab-link" data-target="tab3">tab 3</a>
                            </div>
                        </div>
                        <div class="tabs-wrap">
                            <div class="tab active" id="infoTab">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                            </div>
                            <div class="tab" id="descTab">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                            </div>
                            <div class="tab" id="tab3">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section class="section section-dropdown">
                <div class="container">
                    <h2 class="section-title">DOM dropdown</h2>
                    <div class="dom-dropdown">
                        <a href="#" class="js-toggle-dropdown active" data-target="dropdown1">Toggle dropdown</a>
                        <div class="dropdown" id="dropdown1">
                            <a href="#" style="display: block;">Content 1</a>
                            <a href="#" style="display: block;">Content 2</a>
                            <a href="#" style="display: block;">Content 3</a>
                        </div>
                    </div>
                    <div class="dom-dropdown">
                        <a href="#" class="js-toggle-dropdown" data-target="dropdown2">Toggle dropdown</a>
                        <div class="dropdown" id="dropdown2">
                            <a href="#" style="display: block;">Content 1</a>
                            <a href="#" style="display: block;">Content 2</a>
                            <a href="#" style="display: block;">Content 3</a>
                        </div>
                    </div>
                </div>
            </section>


            <section class="section section-css-slider">
                <div class="container">
                    <h2 class="section-title">CSS slider</h2>
                    <div class="dom-css-slider">
                        <div class="slider-outher">
                            <input type="radio" name="dommCssSlider" id="domCssSlider1" checked>
                            <div class="slide-item">
                                <img src="http://pm1.narvii.com/7297/f8a24fee2f8e840a98563a51dd41548286ce3fe8r1-1200-797v2_uhq.jpg">
                            </div>
                            <input type="radio" name="dommCssSlider" id="domCssSlider2">
                            <div class="slide-item">
                                <img src="https://lider-medicina.ru/wp-content/uploads/2020/07/6-1-%D0%B5%D0%B6%D0%B8%D0%BA%D0%B8.jpg">
                            </div>
                            <input type="radio" name="dommCssSlider" id="domCssSlider3">
                            <div class="slide-item">
                                <img src="https://ezhewiki.net/images/c/cc/%D0%A4%D0%BE%D1%82%D0%BE_%D0%81%D0%B6%D0%B8%D0%BA%D0%B0_%D1%81_%D0%90%D1%80%D0%B1%D1%83%D0%B7%D0%BE%D0%BC.jpg">
                            </div>
                        </div>
                        <div class="slider-dots">
                            <label class="slide-dot" for="domCssSlider1">
                            </label>
                            <label class="slide-dot" for="domCssSlider2">
                            </label>
                            <label class="slide-dot" for="domCssSlider3">
                            </label>
                        </div>
                    </div>
                </div>
                <style>
                    .dom-css-slider img {
                        height: 400px;
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .dom-css-slider label {
                        cursor: pointer;
                    }
                </style>
            </section>
        </main>

        <footer class="footer">

        </footer>

    </div>


    <script src="/js/main.min.js"></script>
</body>

</html>