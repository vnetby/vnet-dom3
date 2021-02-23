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
                    <a href="#" class="link">toggle slider</a>
                    <div class="slide some-class other-class third-class" style="transition-duration: 1s; overflow: hidden">
                        <?php
                        for ($i = 0; $i < 10; $i++) {
                        ?>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ducimus consequatur fugiat consectetur aut voluptate eum quo distinctio praesentium soluta et repellat, ut modi labore porro dolor! Vitae, repudiandae qui.
                        <?php
                        }
                        ?>
                    </div>
                    <div>
                        <input type="text" class="input">
                    </div>
                    <ul>
                        <li class="find-me">
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <div>
                                                    <div class="child">CHILD</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="find-me">
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <div>
                                                    <div class="child">CHILD</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>


            <section class="section section-tabs">
                <div class="container">
                    <h2 class="section-title">DOM tabs</h2>
                    <div class="tabs-row js-dom-tabs">
                        <div class="tabs-nav">
                            <div class="tab-nav-col">
                                <a href="#" class="tab-link" data-target="infoTab">Характеристики</a>
                            </div>
                            <div class="tab-nav-col">
                                <a href="#" class="tab-link" data-target="descTab">Описание</a>
                            </div>
                        </div>
                        <div class="tabs-wrap">
                            <div class="tab" id="infoTab">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                            </div>
                            <div class="tab" id="descTab">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, officiis iste! Iure nihil sequi perferendis perspiciatis! Dolorum facilis natus blanditiis, officiis esse accusamus, assumenda dignissimos aperiam pariatur sed numquam laudantium?
                                SECOND TAB
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer class="footer">

        </footer>

    </div>


    <script src="/js/main.min.js"></script>
</body>

</html>