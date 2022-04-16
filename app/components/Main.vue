<template>
  <Page @loaded="setTasks">
    <ActionBar>
      <Label text="Задачи" /> -->
      <ActionItem
        icon=""
        text="Left"
        @tap="filterAction"
        android.systemIcon="ic_menu_sort_by_size"
        android.position="actionBar"
      />
    </ActionBar>
    <StackLayout class="container">
      <AbsoluteLayout>
        <StackLayout width="400" height="700">
          <SearchBar
            id="searchBar"
            hint="Поиск"
            v-model="search"
            @clear="clear"
            @submit="onSubmit"
          />
          <ListView for="task in filterTasks" row="1" colSpan="2">
            <v-template>
              <GridLayout rows="*, auto" columns="auto, *, auto">
                <Switch
                  v-model="task.check"
                  
                  @checkedChange="switchCheck(task.id)"
                  col="0"
                  rowSpan="2"
                />
                <StackLayout col="1" rowSpan="2" @tap="navigate(task.id)">
                  <Label
                    :text="task.text"
                    textTransform="capitalize"
                    class="body"
                  />
                  <Label :text="task.date" wrap="true" class="body" />
                </StackLayout>
                <Button
                  text="✕"
                  @tap="deletTask(task.id)"
                  col="2"
                  rowSpan="2"
                  class="delete"
                />
              </GridLayout>
            </v-template>
          </ListView>
          <StackLayout
            v-if="taskList.length == 0"
            horizontalAlignment="center"
            class="title"
            verticalAlignment="center"
            height="450"
          >
            <Label text="Нет записей" />
          </StackLayout>
        </StackLayout>
        <Button
          left="250"
          top="580"
          text.decode="+"
          @tap="openModal"
          class="add"
        />
      </AbsoluteLayout>
    </StackLayout>
  </Page>
</template>

<script>
import { action, ApplicationSettings } from "@nativescript/core";
import AddTask from "@/components/AddTask.vue";
import DetailTask from "@/components/DetailTask.vue";

export default {
  components: {
    AddTask,
    DetailTask,
  },
  data: function () {
    return {
      app: ApplicationSettings,
      taskList: [
        {
          id: 1,
          text: "dfdfxvcxcvxd dsjfkljs dklf",
          date: "dfdfsa asas",
          check: true,
        },
      ],
      filterTasks: [],
      search: "",
      filterOption: null,
    };
  },
  methods: {
    async openModal() {
      let data = await this.$showModal(AddTask);
      if (data !== "") {
        data = this.toJson(data);
        data["id"] = this.taskList.length;
        this.taskList.splice(0, 0, data);
        this.addValue(this.toStr(this.taskList));
        this.filterTasks = this.taskList;
        this.onSubmit()
      }
    },
    setTasks() {
      this.taskList = this.toJson(this.app.getString("taskList", "[]"));
      this.filterTasks = this.taskList;
    },
    navigate(id) {
      this.$navigateTo(DetailTask, { props: { id: id } });
    },
    onSubmit() {
      if (this.search.trim().length > 0) {
        this.filter();
        let tasks = this.filterTasks;
        this.filterTasks = tasks.filter((x) =>
          x.text.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        this.clear();
      }
    },
    clear() {
      this.search = "";
      this.filter();
    },
    filterAction() {
      action("Выберите тип фильтрации", "Закрыть", [
        "Выполненные задача",
        "Не выполненные задачи",
        "Все задачи",
      ]).then((result) => {
        switch (result) {
          case "Выполненные задача": {
            this.filterOption = true;
            break;
          }
          case "Не выполненные задачи": {
            this.filterOption = false;
            break;
          }
          case "Все задачи": {
            this.filterOption = null;
            break;
          }
          default: {
            break;
          }
        }
        this.filter();
        this.onSubmit()
      });
    },
    filter() {
      if (this.filterOption !== null) {
        this.filterTasks = this.taskList.filter(
          (x) => x.check == this.filterOption
        );
      } else {
        this.filterTasks = this.taskList;
      }
    },
    switchCheck(id) {
      let index = this.taskList.findIndex((x) => x.id == id);
      let data = this.taskList[index];
    //   data.check = !data.check;
      alert(data.check);
      this.taskList.splice(index, 1, data);
      this.addValue(this.toStr(this.taskList));
    //   this.filterTasks = this.taskList;
    },
    addValue(value) {
      this.app.setString("taskList", value);
    },
    deletTask(id) {
      let index = this.taskList.findIndex((x) => x.id == id);
      this.taskList.splice(index, 1);
      this.addValue(this.toStr(this.taskList));
    },
    deleteAll() {
      this.app.clear();
    },
    toStr(value) {
      return JSON.stringify(value);
    },
    toJson(value) {
      return JSON.parse(value);
    },
  },
};
</script>

<style>
.box {
  width: 100%;
  height: 100%;
  background-color: #d3d0d0;
}
.up {
  position: relative;
  right: 30px;
  bottom: 55;
}
.add {
  position: relative;
  right: 30px;
  bottom: 55;
  height: 55;
  width: 55;
  border-radius: 40;
  font-size: 40px;
  text-align: center;
  color: white;
  background-color: rgb(250, 150, 0);
}
.container {
  background-color: #f7f1f1;
}
.item {
  padding: 0, 0, 0, 0;
  margin: 0, 2%, 2%, 2%;
  border-radius: 10;
  background-color: white;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.body {
  font-size: 15px;
}
.delete {
  border: 0;
  /* border-radius: 40; */
  background-color: #f7f1f1;
  font-size: 20px;
  color: red;
}
</style>
