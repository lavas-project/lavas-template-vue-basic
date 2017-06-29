<template>
    <div class="hello">
        <h1 class="gray--text">LAVAS</h1>
        <h4 class="gray--text">[ˈlɑ:vəz]</h4>

        <ul>
            <li><a href="https://github.com/lavas-project">Lavas Github</a></li>
            <li><a href="https://lavas.baidu.com">Lavas 官网</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            };
        }
    };
</script>

<style scoped>
h1 {
    margin-top: 100px;
    font-size: 46px;
    font-weight: 500;
}

h4 {
    margin-bottom: 50px;
}

ul {
    padding: 0;
}

li {
    list-style: none;
    display: inline-block;
}

a {
    display: inline-block;
    line-height: 45px;
    width: 150px;
    height: 45px;
    font-weight: bold;
    background: #2874f0;
    text-decoration: none;
    color: #fff;
}


</style>

