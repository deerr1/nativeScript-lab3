<template>
  <Page>
    <StackLayout>
      <Label text="Cоздать задачу" textAlignment="center" class="title"/>
      <GridLayout rows="auto, auto, auto, auto" columns="*, *">
        <TextView hint="Задача" v-model="text" row="0" colSpan="2" class="body"/>
        <Label text="Выполненно?" textAlignment="center" verticalAlignment="center" row="2" col="0" class="body"/>
        <Switch v-model="check" row="2" col="1" />
        <Button text="Добавить" @tap="$modal.close(getData())" row="3" col="0" />
        <Button text="Закрыть" @tap="$modal.close('')" row="3" col="1" />
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
export default {
  data: function () {
    return {
      text: "",
      date: new Date().toDateString(),
      check: false,
    };
  },
  methods: {
      getData: function(){
          return JSON.stringify({
              text: this.text,
              date: this.date,
              check: this.check
          })
      }
  }
};
</script>

<style>
.title {
  font-size: 18px;
  font-weight: bold;
}
.body {
  font-size: 15px;
}
</style>
