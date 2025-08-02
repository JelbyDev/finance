<template>
  <div>
    <div class="gg">
      Шапочка
    </div>

    <hr>

    <div>
      <RouterLink to="/">
        Акции
      </RouterLink>

      <RouterLink to="/2">
        Облигации
      </RouterLink>
    </div>

    <hr>

    <RouterView />
  </div>
</template>

<style scope>
.gg{
font-size: 14px;
}
</style>
