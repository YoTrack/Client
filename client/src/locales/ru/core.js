import dateFns from 'date-fns/locale/ru';

export default {
  dateFns,

  format: {
    date: 'P',
    time: 'HH:mm',
    dateTime: '$t(format:date) $t(format:time)',
    longDate: 'd MMM',
    longDateTime: "d MMMM 'в' p",
  },

  translation: {
    common: {
      aboutTracker: 'О проекте Tracker',
      account: 'Учетная запись',
      actions: 'Действия',
      addAttachment: 'Добавление вложения',
      addComment: 'Добавление комментария',
      addManager_title: 'Добавление менеджера',
      addMember: 'Добавление участника',
      addUser: 'Добавление пользователя',
      administrator: 'Администратор',
      all: 'Все',
      allChangesWillBeAutomaticallySavedAfterConnectionRestored:
        'Все изменения сохранятся автоматически,<br />как только подключение восстановится',
      areYouSureYouWantToDeleteThisAttachment: 'Вы уверены, что хотите удалить это вложение?',
      areYouSureYouWantToDeleteThisBoard: 'Вы уверены, что хотите удалить эту доску?',
      areYouSureYouWantToDeleteThisCard: 'Вы уверены, что хотите удалить эту карточку?',
      areYouSureYouWantToDeleteThisComment: 'Вы уверены, что хотите удалить этот комментарий?',
      areYouSureYouWantToDeleteThisLabel: 'Вы уверены, что хотите удалить эту метку?',
      areYouSureYouWantToDeleteThisList: 'Вы уверены, что хотите удалить этот список?',
      areYouSureYouWantToDeleteThisProject: 'Вы уверены, что хотите удалить этот проект?',
      areYouSureYouWantToDeleteThisTask: 'Вы уверены, что хотите удалить эту задачу?',
      areYouSureYouWantToDeleteThisUser: 'Вы уверены, что хотите удалить этого пользователя?',
      areYouSureYouWantToLeaveBoard: 'Вы уверены, что хотите покинуть эту доску?',
      areYouSureYouWantToLeaveProject: 'Вы уверены, что хотите покинуть этот проект?',
      areYouSureYouWantToRemoveThisManagerFromProject:
        'Вы уверены, что хотите удалить этого менеджера из проекта?',
      areYouSureYouWantToRemoveThisMemberFromBoard:
        'Вы уверены, что хотите удалить этого участника из доски?',
      attachment: 'Вложение',
      attachments: 'Вложения',
      authentication: 'Аутентификация',
      background: 'Фон',
      board: 'Доска',
      boardNotFound: 'Доска не найдена',
      canComment: 'Может комментировать',
      canEditContentOfBoard: 'Может редактировать содержимое доски',
      canOnlyViewBoard: 'Может только просматривать доску',
      cardActions: 'Действия с карточкой',
      cardNotFound: 'Карточка не найдена',
      cardOrActionAreDeleted: 'Карточка или действие удалены',
      color: 'Цвет',
      connectionRestored: 'Соединение восстановлено',
      createBoard: 'Создание доски',
      createLabel: 'Создание метки',
      createNewOneOrSelectExistingOne: 'Создайте новую или выберите<br />уже существующую',
      createProject: 'Создание проекта',
      createTextFile: 'Создание текстового файла',
      currentPassword: 'Текущий пароль',
      dangerZone_title: 'Опасная зона',
      date: 'Дата',
      dueDate: 'Срок',
      deleteAttachment: 'Удаление вложения',
      deleteBoard: 'Удаление доски',
      deleteCard: 'Удаление карточки',
      deleteComment: 'Удаление комментария',
      deleteLabel: 'Удаление метки',
      deleteList: 'Удаление списка',
      deleteProject: 'Удаление проекта',
      deleteTask: 'Удаление задачи',
      deleteUser: 'Удаление пользователя',
      description: 'Описание',
      detectAutomatically: 'Определить автоматически',
      dropFileToUpload: 'Перетяните файл, чтобы загрузить',
      editor: 'Редактор',
      editAttachment: 'Изменение вложения',
      editAvatar: 'Изменение аватара',
      editBoard: 'Изменение доски',
      editBackground: 'Изменение фона',
      editDueDate: 'Изменение срока',
      editEmail: 'Изменение e-mail',
      editInformation: 'Изменение информации',
      editLabel: 'Изменение метки',
      editPassword: 'Изменение пароля',
      editPermissions: 'Редактирование разрешений',
      editStopwatch: 'Изменение секундомера',
      editTitle: 'Изменение названия',
      editUsername: 'Изменение имени пользователя',
      email: 'E-mail',
      emailAlreadyInUse: 'E-mail уже занят',
      enterCardTitle: 'Введите заголовок для этой карточки...',
      enterDescription: 'Введите описание...',
      enterFilename: 'Введите название файла',
      enterListTitle: 'Введите заголовок списка...',
      enterProjectTitle: 'Введите название проекта',
      enterTaskDescription: 'Введите описание задачи...',
      filterByLabels: 'Фильтр по меткам',
      filterByMembers: 'Фильтр по участникам',
      fromComputer: 'С компьютера',
      fromTrello: 'Из Trello',
      general: 'Основные',
      hours: 'Часы',
      importBoard: 'Импорт доски',
      invalidCurrentPassword: 'Неверный текущий пароль',
      labels: 'Метки',
      language: 'Язык',
      leaveBoard: 'Покинуть доску',
      leaveProject: 'Покинуть проект',
      list: 'Список',
      listActions: 'Действия со списком',
      managers: 'Менеджеры',
      members: 'Участники',
      assignee: 'Исполнитель',
      priority: 'Приоритет',
      duration: 'Длительность',
      minutes: 'Минуты',
      moveCard: 'Перемещение карточки',
      name: 'Имя',
      newEmail: 'Новый e-mail',
      newPassword: 'Новый пароль',
      newUsername: 'Новое имя пользователя',
      noConnectionToServer: 'Нет соединения с сервером',
      noBoards: 'Досок нет',
      noLists: 'Списков нет',
      noProjects: 'Проектов нет',
      notifications: 'Уведомления',
      noUnreadNotifications: 'Уведомлений нет',
      openBoard: 'Откройте доску',
      optional_inline: 'необязательно',
      organization: 'Организация',
      phone: 'Телефон',
      preferences: 'Предпочтения',
      pressPasteShortcutToAddAttachmentFromClipboard:
        'Совет: нажмите Ctrl-V (Cmd-V на Mac), чтобы добавить вложение из буфера обмена',
      project: 'Проект',
      projectActions: 'Действия с проектом',
      projectNotFound: 'Проект не найден',
      removeManager: 'Удалить менеджера',
      removeMember: 'Удаление участника',
      searchLabels: 'Поиск меток...',
      searchMembers: 'Поиск участников...',
      searchUsers: 'Поиск пользователей...',
      seconds: 'Секунды',
      selectBoard: 'Выберите доску',
      selectList: 'Выберите список',
      selectPermissions: 'Выбор разрешений',
      selectProject: 'Выберите проект',
      settings: 'Настройки',
      stopwatch: 'Секундомер',
      subscribeToMyOwnCardsByDefault: 'По умолчанию подписываться на мои собственные карточки',
      taskActions: 'Действия с задачей',
      tasks: 'Задачи',
      thereIsNoPreviewAvailableForThisAttachment: 'Предпросмотр для этого вложения недоступен',
      time: 'Время',
      title: 'Название',
      userActions: 'Действия с пользователем',
      userAddedThisCardToList: '<0>{{user}}</0><1> добавил(а) эту карточку в {{list}}</1>',
      userLeftNewCommentToCard: '{{user}} оставил(а) комментарий «{{comment}}» к <2>{{card}}</2>',
      userMovedCardFromListToList:
        '{{user}} переместил(а) <2>{{card}}</2> из {{fromList}} в {{toList}}',
      userMovedThisCardFromListToList:
        '<0>{{user}}</0><1> переместил(а) эту карточку из {{fromList}} в {{toList}}</1>',
      username: 'Имя пользователя',
      usernameAlreadyInUse: 'Имя пользователя уже занято',
      users: 'Пользователи',
      version: 'Версия',
      viewer: 'Читатель',
      writeComment: 'Напишите комментарий...',
    },

    action: {
      addAnotherCard: 'Добавить еще одну карточку',
      addAnotherList: 'Добавить еще один список',
      addAnotherTask: 'Добавить еще одну задачу',
      addCard: 'Добавить карточку',
      addComment: 'Добавить комментарий',
      addList: 'Добавить список',
      addMember: 'Добавить участника',
      addMoreDetailedDescription: 'Добавить более подробное описание',
      addTask: 'Добавить задачу',
      addToCard: 'Добавить на карточку',
      addUser: 'Добавить пользователя',
      createBoard: 'Создать доску',
      createFile: 'Создать файл',
      createLabel: 'Создать метку',
      createNewLabel: 'Создать новую метку',
      createProject: 'Создать проект',
      delete: 'Удалить',
      deleteAttachment: 'Удалить вложение',
      deleteAvatar: 'Удалить аватар',
      deleteBoard: 'Удалить доску',
      deleteCard: 'Удалить карточку',
      deleteComment: 'Удалить комментарий',
      deleteImage: 'Удалить изображение',
      deleteLabel: 'Удалить метку',
      deleteList: 'Удалить список',
      deleteProject: 'Удалить проект',
      deleteTask: 'Удалить задачу',
      deleteUser: 'Удалить пользователя',
      edit: 'Изменить',
      editBackground: 'Изменить фон',
      editDueDate: 'Изменить срок',
      editDescription: 'Изменить описание',
      editEmail: 'Изменить e-mail',
      editInformation: 'Изменить информацию',
      editPassword: 'Изменить пароль',
      editPermissions: 'Изменить разрешения',
      editStopwatch: 'Изменить секундомер',
      editTask: 'Изменить задачу',
      editTitle: 'Изменить название',
      editUsername: 'Изменить имя пользователя',
      hideDetails: 'Скрыть подробности',
      import: 'Импорт',
      leaveBoard: 'Покинуть доску',
      leaveProject: 'Покинуть проект',
      logOut: 'Выйти',
      makeCover: 'Сделать обложкой',
      move: 'Переместить',
      moveCard: 'Переместить карточку',
      remove: 'Убрать',
      removeBackground: 'Убрать фон',
      removeCover: 'Убрать обложку',
      removeFromBoard: 'Удалить из доски',
      removeFromProject: 'Удалить из проекта',
      removeManager: 'Удалить менеджера',
      removeMember: 'Удалить участника',
      save: 'Сохранить',
      showAllAttachments: 'Показать все вложения ({{hidden}} скрыто)',
      showDetails: 'Показать подробности',
      showFewerAttachments: 'Показать меньше вложений',
      start: 'Начать',
      stop: 'Остановить',
      subscribe: 'Подписаться',
      unsubscribe: 'Отписаться',
      uploadNewAvatar: 'Загрузить новый аватар',
      uploadNewImage: 'Загрузить новое изображение',
    },
  },
};
