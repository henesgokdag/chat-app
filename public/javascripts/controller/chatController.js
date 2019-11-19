app.controller("chatController", [
  "$scope",
  "chatFactory",
  ($scope, chatFactory) => {
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.chatName = "";
    $scope.message = "";
    $scope.roomId = "";
    $scope.messages = [];
    const socket = io.connect("http://localhost:3000");
    socket.on("onlineList", users => {
      $scope.onlineList = users;
      console.log($scope.onlineList);
      $scope.$apply();
    });
    socket.on("roomList", rooms => {
      $scope.roomList = rooms;
      $scope.$apply();
    });
    $scope.newMessage = () => {
      socket.emit("newMessage", {
        message: $scope.message,
        roomId: $scope.roomId
      });
      $scope.message = "";
    };
    $scope.switchRoom = room => {
      $scope.chatClicked = true;
      $scope.chatName = room.name;
      $scope.roomId = room.id;
      chatFactory.getMessages(room.id).then(data=>{
    
        $scope.messages[room.id]=data.messages;
        console.log($scope.messages);
      })
    };
    $scope.newRoom = () => {
      // let randomName = Math.random().toString().substring(7);
      let roomName = window.prompt("enter room name");
      if (roomName !== "" && roomName !== null) {
        socket.emit("newRoom", roomName);
      }
    };
    $scope.changeTab = tab => {
      $scope.activeTab = tab;
    };
  }
]);
