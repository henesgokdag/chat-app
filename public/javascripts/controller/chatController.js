app.controller("chatController", [
  "$scope",
  "chatFactory",
  "userFactory",
  ($scope, chatFactory,userFactory) => {
    function init() {
      userFactory.getUser().then(user=>{
        console.log(user);
        $scope.user=user;
      })
    }
    init();
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.loadingMessages=false;
    $scope.chatName = "";
    $scope.message = "";
    $scope.roomId = "";
    $scope.messages = [];
    $scope.user={};
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
    socket.on('receiveMessage',data=>{
     
      $scope.messages[data.roomId].push({
        message: data.message,
        username: data.username,
        surname: data.surname,
        userId: data.userId
      });
      $scope.$apply();
    });
    $scope.newMessage = () => {
      if( $scope.message.trim()!=='')
      {
        socket.emit("newMessage", {
          message: $scope.message,
          roomId: $scope.roomId
        });
        $scope.messages[$scope.roomId].push({
          message: $scope.message,
          username: $scope.user.name,
          surname: $scope.user.surname,
          userId: $scope.user._id
        });
        $scope.message = "";
      }
     
    };
    $scope.switchRoom = room => {
      
      $scope.chatClicked = true;
      $scope.chatName = room.name;
      $scope.roomId = room.id;
      if(!$scope.messages.hasOwnProperty(room.id)){
        $scope.loadingMessages=true;
        chatFactory.getMessages(room.id).then(data=>{
          $scope.messages[room.id]=data.messages;
          $scope.loadingMessages=false;
        });
      }
     
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
