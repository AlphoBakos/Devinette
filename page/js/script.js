document.getElementById('btn')
    .addEventListener('click', function () {
        var sidebar2 = document.getElementById('sidebar2');
        sidebar2.classList.toggle('active');
    });

document.getElementById('icon')
    .addEventListener('click', function () {
        var sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    });

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('deconnexion').addEventListener('click', () => {
        window.location.href = '../../index.html'
    })
})