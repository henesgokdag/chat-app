app.controller("chatController", [
  "$scope",
  $scope => {
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
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
    $scope.newRoom = () => {
      // let randomName = Math.random().toString().substring(7);
      let roomName = window.prompt("enter room name");
      if (roomName !== '' && roomName !== null) {
        socket.emit("newRoom", roomName);
      }
    };
    $scope.changeTab = tab => {
      $scope.activeTab = tab;
    };
  }
]);
