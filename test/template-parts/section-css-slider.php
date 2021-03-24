<?php
for ($s = 0; $s < 1; $s++) {
?>
    <section class="section section-css-slider">
        <div class="container">
            <h2 class="section-title">CSS slider</h2>
            <div class="js-slider dom-css-slider" data-dots data-draggable data-loop>
                <?php
                for ($i = 0; $i < 1; $i++) {
                ?>
                    <div class="slide-item" data-thumb="http://pm1.narvii.com/7297/f8a24fee2f8e840a98563a51dd41548286ce3fe8r1-1200-797v2_uhq.jpg">
                        <img data-lazy="http://pm1.narvii.com/7297/f8a24fee2f8e840a98563a51dd41548286ce3fe8r1-1200-797v2_uhq.jpg">
                    </div>
                    <div class="slide-item" data-thumb="https://lider-medicina.ru/wp-content/uploads/2020/07/6-1-%D0%B5%D0%B6%D0%B8%D0%BA%D0%B8.jpg">
                        <img data-lazy="https://lider-medicina.ru/wp-content/uploads/2020/07/6-1-%D0%B5%D0%B6%D0%B8%D0%BA%D0%B8.jpg">
                    </div>
                    <div class="slide-item<?= $i === 0 ? '' : ''; ?>" data-thumb="https://ezhewiki.net/images/c/cc/%D0%A4%D0%BE%D1%82%D0%BE_%D0%81%D0%B6%D0%B8%D0%BA%D0%B0_%D1%81_%D0%90%D1%80%D0%B1%D1%83%D0%B7%D0%BE%D0%BC.jpg">
                        <img data-lazy="https://ezhewiki.net/images/c/cc/%D0%A4%D0%BE%D1%82%D0%BE_%D0%81%D0%B6%D0%B8%D0%BA%D0%B0_%D1%81_%D0%90%D1%80%D0%B1%D1%83%D0%B7%D0%BE%D0%BC.jpg">
                    </div>
                <?php
                }
                ?>
            </div>
        </div>
    </section>
<?php
}
?>