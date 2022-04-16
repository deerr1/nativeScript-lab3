<template>
  <Page >
      <ActionBar>
      <NavigationButton
        @tap="$navigateBack()"
        android.systemIcon="ic_menu_back"
      />
      <Label text="Редактирование записей" />
    </ActionBar>
    <GridLayout rows="auto, auto, auto, auto " columns="*,*">
        <TextView v-model="task.text" row="0" colSpan="2" />
        <Label text="Выполненно?" textAlignment="center" verticalAlignment="center" row="2" col="0" class="body"/>
        <Switch v-model="task.check" row="2" col="1" />
        <Button text="Сохранить" @tap="save()" row="3" col="0" class="save" />
        <Button text="Удалить" @tap="deletTask()" row="3" col="1" class="delete"/>
    </GridLayout>
  </Page>
</template>

<script>
import { ApplicationSettings } from "@nativescript/core";
export default {
    props: ['id'],
    data: function(){
        return {
            app: ApplicationSettings,
            task: {},
        }
    },
    mounted: function() {
        let tasks = JSON.parse(this.app.getString("taskList"));
        this.task = tasks.find(x=>x.id == this.id);
    },
    methods: {
        save(){
            let tasks = JSON.parse(this.app.getString("taskList"));
            let index = tasks.findIndex(x=>x.id == this.id);
            this.task.data = new Date().toDateString()
            tasks.splice(index, 1);
            tasks.splice(0, 0, this.task);
            this.app.setString("taskList", JSON.stringify(tasks));
            this.$navigateBack();
        },
        deletTask(){
            let tasks = JSON.parse(this.app.getString("taskList"));
            let index = tasks.findIndex(x=>x.id == this.id);
            tasks.splice(index, 1);
            this.app.setString("taskList", JSON.stringify(tasks));
            this.$navigateBack();
        }
    }

}
</script>

<style>
.save {
    background-color: rgb(250, 150, 0);
    color: white;
}
.delete{
    background-color: red;
    color: white;
}
</style>