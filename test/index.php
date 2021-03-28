<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>test vnet-dom3</title>
    <link rel="stylesheet" href="/css/index.min.css">
</head>

<body>
    <div class="other-div"></div>

    <div class="site-wrap">
        <header class="header">

        </header>

        <main class="main">
            <?php
            require dirname(__FILE__) . '/template-parts/section-toggle-slide.php';
            require dirname(__FILE__) . '/template-parts/section-dropdown.php';
            require dirname(__FILE__) . '/template-parts/section-dom-tabs.php';
            require dirname(__FILE__) . '/template-parts/section-css-slider.php';
            ?>
        </main>

        <form action="" class="form">
            <input type="text" class="test-input" value="some" data-test-attr="data value">
            <input type="text" class="test-input" value="some" data-test-attr="data value">
            <input type="text" class="test-input" value="some" data-test-attr="data value">
            <input type="text" class="test-input" value="some" data-test-attr="data value">
            <input type="text" class="test-input" value="some" data-test-attr="data value">
        </form>

        <footer class="footer">
        </footer>

    </div>


    <script src="/js/index.min.js"></script>
</body>

</html>