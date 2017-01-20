Bootstrap;
import '../styles/main2.css';
import '../styles/main.less';

jQuery('title').html('Pizda');

setTimeout(() => {
    $('.modal').modal();
}, 1000)

$('body').append(
    '<div class="container"><div class="row"><div class="col-xs-6">' +
    'Hello <i class="animated fadeInUp">Webpack</i> <i class="fa fa-facebook"></i>' +
    '</div></div></div>'
);