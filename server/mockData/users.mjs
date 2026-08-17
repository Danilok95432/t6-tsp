export let users = [
	{
		id: '1',
		avatar: 'https://opmosreg.ru/upload/iblock/707/707b3d25dad112e9474ed24a41258eca.jpg',
		fullname: 'Ахмадиев Фаризулла Мухаммадиевич',
		statuses: ['Руководитель отделения', 'Член правления ВООПИК'],
		mainStatus: 'Первый статус',
		mainDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
		birthday: '1981.10.17',
		position: 'Руководитель Отделения',
		group: 'Правление',
		regDate: '2010.12.23',
		locality: 'Россия, Тамбовская обл., Сосновский р-н, с. Атманов Угол',
		gender: 'Мужской',
		phones: ['+7 (432) 900-00-00', '+7 (917) 310-09-08'],
		email: 'tatartstan@voopik.ru',
		website: 'www.example.com/konstantinopolskiy',
		relatedObjects: [
			{
				id: '1',
				title: 'Один какой-то Объект Lorem ipsum dolor sit amet, elit. Inventore, repellat.'
			},
			{
				id: '2',
				title: 'Один какой-то Объект adipisicing elit. Inventore, repellat.'
			},
			{
				id: '3',
				title: 'Один какой-то Объект Inventore, repellat.'
			}
		],
		relatedProjects: [
			{
				id: '1',
				title: 'Один какой-то Проект Lorem ipsum dolor sit amet, elit. Inventore, repellat.'
			},
			{
				id: '2',
				title: 'Один какой-то Проект adipisicing elit. Inventore, repellat.'
			},
			{
				id: '3',
				title: 'Один какой-то Проект Inventore, repellat.'
			}
		],
		relatedLinks: [
			{
				id: '0',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				date: '26 марта 2023 года',
				source: 'журнал «Прораб Перестройки», стр. 21-24'
			},

			{
				id: '1',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				date: '26 марта 2023 года',
				source: 'Интернет-портал «Наш Край Тамбов»'
			},

			{
				id: '2',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				date: '26 марта 2023 года',
				source: 'Интернет-портал «Наш Край Тамбов»'
			}
		],
		documents: [
			{
				id: '0',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				type: 'pdf',
				size: '68.5 Кбайт'
			},

			{
				id: '1',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				type: 'pdf',
				size: '68.5 Кбайт'
			},

			{
				id: '2',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				type: 'doc',
				size: '68.5 Кбайт'
			}
		],
		groups: [
			{
				id: '1',
				regionCode: '16',
				level: '3',
				title: 'Клуб национальной культуры «Татар Батыр»',
				role: 'Руководитель',
				entryDate: '1999.03.24',
				status: 'Первый статус'
			},
			{
				id: '2',
				regionCode: '78',
				level: '2',
				title: 'Санкт-Петербург',
				role: 'Участник',
				entryDate: '2005.02.25',
				status: 'Второй статус'
			},
			{
				id: '3',
				regionCode: '90',
				level: '1',
				title: 'Московская область',
				role: 'Участник',
				entryDate: '2019.08.28',
				status: 'Третий статус'
			}
		],
		events: [
			{
				id: '1',
				title: 'Фестиваль объектов военной истории',
				contactPerson: 'Алексей Семенов +7(988) 999-99-00',
				partGroup: 'Клуб «Археоптерикс»',
				location: 'Армейский полигон в/ч 02590-342',
				dates: ['2022.03.24', '2022.03.26'],
				type: 'Посетитель'
			},
			{
				id: '2',
				title: 'Старая татарская усадьба',
				contactPerson: 'Алексей Семенов +7(988) 999-99-00',
				partGroup: 'нет',
				location: 'с. Куркачи Высокогорского р-на',
				dates: ['2022.05.11', '2022.05.20'],
				type: 'Участник'
			},
			{
				id: '3',
				title: 'Замок Винтерфелл',
				contactPerson: 'Алексей Семенов +7(988) 999-99-00',
				partGroup: 'ВФК «Третья стража»',
				location: 'пгт Винтерфелльск-Заволжскокамский',
				dates: ['2022.02.11', '2022.02.13'],
				type: 'Организатор'
			}
		],
		projects: [
			{
				id: '1',
				title: 'Официальное наименование Проекта',
				type: 'Первый тип',
				status: 'Закрыт',
				region: 'Санкт-Петербург'
			},
			{
				id: '2',
				title: 'проект ipsum dolor sit amet',
				type: 'Первый тип',
				status: 'Открыт',
				region: 'Ростовская обл.'
			},
			{
				id: '3',
				title: 'проект №3',
				type: 'Второй тип',
				status: 'Перекрыт',
				region: 'Респ. Татарстан'
			}
		],
		objects: [
			{
				id: '1',
				title: 'Официальное наименование Объекта с сокращениями',
				kind: 'Памятник',
				category: 'Федеральный',
				type: 'Первый тип',
				registryNumber: '342 : 0099 : 4432 : А2',
				status: 'Закрыт',
				region: 'Санкт-Петербург'
			},
			{
				id: '2',
				title: 'Объект 2',
				kind: 'Ансамбль',
				category: 'Региональный',
				type: 'Первый тип',
				registryNumber: '342 : 0099 : 4432 : А2',
				status: 'Открыт',
				region: 'Ростовская обл.'
			},
			{
				id: '3',
				title: 'Объект 3',
				kind: 'Достопримечательное место',
				category: 'Вновь выявленный',
				type: 'Второй тип',
				registryNumber: '342 : 0099 : 4432 : А2',
				status: 'Перекрыт',
				region: 'Респ. Татарстан'
			},
		],
		photos: [
			{
				id: '1',
				title: 'Малые Корелы. Экскурсия по Двинскому enean euismod b',
				date: '2022.12.23',
				url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wooden_church_and_house_01.jpg'
			},
			{
				id: '2',
				title: 'Спасо-Бородинский монастырь. Часть 2',
				date: '2021.11.13',
				url: 'https://www.borodino.ru/wp-content/uploads/2017/08/DSC01241-1-1024x689.jpg'
			},
			{
				id: '3',
				title: 'Спасо-Бородинский монастырь. Часть 2',
				date: '2021.11.13',
				url: 'https://www.borodino.ru/wp-content/uploads/2020/09/IMG_20200914_122627_287.jpg'
			},
			{
				id: '4',
				title: 'Пензенское отделение ВООПИК созывает деле enean euismod b',
				date: '2018.05.01',
				url: 'https://voopik.ru/upload/iblock/e9b/otdel_voopig_b.jpg'
			},
			{
				id: '5',
				title: 'Пензенское отделение ВООПИК созывает деле enean euismod b',
				date: '2011.01.05',
				url: 'https://voopik.ru/upload/iblock/614/3110-1.jpg'
			},
		],
		videos: [
			{
				id: '1',
				title: 'Малые Корелы. Экскурсия по Двинскому enean euismod b',
				date: '2022.12.23',
				url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wooden_church_and_house_01.jpg'
			},
			{
				id: '2',
				title: 'Спасо-Бородинский монастырь. Часть 2',
				date: '2021.11.13',
				url: 'https://www.borodino.ru/wp-content/uploads/2017/08/DSC01241-1-1024x689.jpg'
			},
			{
				id: '3',
				title: 'Спасо-Бородинский монастырь. Часть 2',
				date: '2021.11.13',
				url: 'https://www.borodino.ru/wp-content/uploads/2020/09/IMG_20200914_122627_287.jpg'
			},
			{
				id: '4',
				title: 'Пензенское отделение ВООПИК созывает деле enean euismod b',
				date: '2018.05.01',
				url: 'https://voopik.ru/upload/iblock/e9b/otdel_voopig_b.jpg'
			},
			{
				id: '5',
				title: 'Пензенское отделение ВООПИК созывает деле enean euismod b',
				date: '2011.01.05',
				url: 'https://voopik.ru/upload/iblock/614/3110-1.jpg'
			},
		]
	},
	{
		id: '2',
		avatar: 'https://opmosreg.ru/upload/iblock/b49/b49cb844ff7b12fcba676470aa47864c.jpeg',
		fullname: 'Кленовичичевский Богдан Архедупсович',
		statuses: ['Руководитель отделения', 'Член правления ВООПИК'],
		mainStatus: 'Второй статус',
		mainDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
		birthday: '1977.09.11',
		position: 'Секретарь Отделения',
		group: 'Правление',
		regDate: '2005.02.15',
		locality: 'Россия, Тамбовская обл., г. Тамбов',
		gender: 'Мужской',
		phones: ['+7 (432) 923-11-18', '+7 (917) 410-05-08'],
		email: 'bogdan@voopik.ru',
		website: 'www.example.com/arch',
		relatedObjects: [
			{
				id: '1',
				title: 'Один какой-то Объект Lorem ipsum dolor sit amet, elit. Inventore, repellat.'
			},
			{
				id: '2',
				title: 'Один какой-то Объект adipisicing elit. Inventore, repellat.'
			},
			{
				id: '3',
				title: 'Один какой-то Объект Inventore, repellat.'
			}
		],
		relatedProjects: [
			{
				id: '1',
				title: 'Один какой-то Проект Lorem ipsum dolor sit amet, elit. Inventore, repellat.'
			},
			{
				id: '2',
				title: 'Один какой-то Проект adipisicing elit. Inventore, repellat.'
			},
			{
				id: '3',
				title: 'Один какой-то Проект Inventore, repellat.'
			}
		],
		relatedLinks: [
			{
				id: '0',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				date: '26 марта 2023 года',
				source: 'журнал «Прораб Перестройки», стр. 21-24'
			},

			{
				id: '1',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				date: '26 марта 2023 года',
				source: 'Интернет-портал «Наш Край Тамбов»'
			},

			{
				id: '2',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				date: '26 марта 2023 года',
				source: 'Интернет-портал «Наш Край Тамбов»'
			}
		],
		documents: [
			{
				id: '0',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				type: 'pdf',
				size: '68.5 Кбайт'
			},

			{
				id: '1',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				type: 'pdf',
				size: '68.5 Кбайт'
			},

			{
				id: '2',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				type: 'doc',
				size: '68.5 Кбайт'
			}
		],
		groups: [
			{
				id: '2',
				regionCode: '78',
				level: '2',
				title: 'Санкт-Петербург',
				role: 'Участник',
				entryDate: '2005.02.25',
				status: 'Второй статус'
			},
			{
				id: '3',
				regionCode: '90',
				level: '1',
				title: 'Московская область',
				role: 'Участник',
				entryDate: '2019.08.28',
				status: 'Третий статус'
			}
		],
		events: [
			{
				id: '2',
				title: 'Старая татарская усадьба',
				contactPerson: 'Алексей Семенов +7(988) 999-99-00',
				partGroup: 'нет',
				location: 'с. Куркачи Высокогорского р-на',
				dates: ['2022.05.11', '2022.05.20'],
				type: 'Участник'
			},
			{
				id: '3',
				title: 'Замок Винтерфелл',
				contactPerson: 'Алексей Семенов +7(988) 999-99-00',
				partGroup: 'ВФК «Третья стража»',
				location: 'пгт Винтерфелльск-Заволжскокамский',
				dates: ['2022.02.11', '2022.02.13'],
				type: 'Организатор'
			}
		],
		projects: [
			{
				id: '2',
				title: 'проект ipsum dolor sit amet',
				type: 'Первый тип',
				status: 'Открыт',
				region: 'Ростовская обл.'
			},
			{
				id: '3',
				title: 'проект №3',
				type: 'Второй тип',
				status: 'Перекрыт',
				region: 'Респ. Татарстан'
			}
		],
		objects: [
			{
				id: '2',
				title: 'Объект 2',
				kind: 'Достопримечательное место',
				category: 'Вновь выявленный',
				type: 'Первый тип',
				registryNumber: '342 : 0099 : 4432 : А2',
				status: 'Открыт',
				region: 'Ростовская обл.'
			},
			{
				id: '3',
				title: 'Объект 3',
				kind: 'Ансамбль',
				category: 'Региональный',
				type: 'Второй тип',
				registryNumber: '342 : 0099 : 4432 : А2',
				status: 'Перекрыт',
				region: 'Респ. Татарстан'
			},
		],
		photos: [
			{
				id: '1',
				title: 'Малые Корелы. Экскурсия по Двинскому enean euismod b',
				date: '2022.12.23',
				url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wooden_church_and_house_01.jpg'
			},
			{
				id: '2',
				title: 'Спасо-Бородинский монастырь. Часть 2',
				date: '2021.11.13',
				url: 'https://www.borodino.ru/wp-content/uploads/2017/08/DSC01241-1-1024x689.jpg'
			},
			{
				id: '3',
				title: 'Спасо-Бородинский монастырь. Часть 2',
				date: '2021.11.13',
				url: 'https://www.borodino.ru/wp-content/uploads/2020/09/IMG_20200914_122627_287.jpg'
			},
			{
				id: '4',
				title: 'Пензенское отделение ВООПИК созывает деле enean euismod b',
				date: '2018.05.01',
				url: 'https://voopik.ru/upload/iblock/e9b/otdel_voopig_b.jpg'
			},
			{
				id: '5',
				title: 'Пензенское отделение ВООПИК созывает деле enean euismod b',
				date: '2011.01.05',
				url: 'https://voopik.ru/upload/iblock/614/3110-1.jpg'
			},
		],
		videos: [
			{
				id: '1',
				title: 'Малые Корелы. Экскурсия по Двинскому enean euismod b',
				date: '2022.12.23',
				url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wooden_church_and_house_01.jpg'
			},
			{
				id: '2',
				title: 'Спасо-Бородинский монастырь. Часть 2',
				date: '2021.11.13',
				url: 'https://www.borodino.ru/wp-content/uploads/2017/08/DSC01241-1-1024x689.jpg'
			},
			{
				id: '3',
				title: 'Спасо-Бородинский монастырь. Часть 2',
				date: '2021.11.13',
				url: 'https://www.borodino.ru/wp-content/uploads/2020/09/IMG_20200914_122627_287.jpg'
			},
			{
				id: '4',
				title: 'Пензенское отделение ВООПИК созывает деле enean euismod b',
				date: '2018.05.01',
				url: 'https://voopik.ru/upload/iblock/e9b/otdel_voopig_b.jpg'
			},
			{
				id: '5',
				title: 'Пензенское отделение ВООПИК созывает деле enean euismod b',
				date: '2011.01.05',
				url: 'https://voopik.ru/upload/iblock/614/3110-1.jpg'
			},
		]
	},
	{
		id: '3',
		avatar: 'https://opmosreg.ru/upload/iblock/3d6/3d666e096b6b5c70911df0b8a6b6e558.jpg',
		fullname: 'Нифаригуллина Мавлюда Талгатовна',
		statuses: ['Руководитель отделения', 'Член правления ВООПИК'],
		mainStatus: 'Третий статус',
		mainDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
		birthday: '1992.08.11',
		position: 'Участник',
		group: 'Участники',
		regDate: '2004.03.11',
		locality: 'Россия, Тамбовская обл., г. Тамбов',
		gender: 'Женский',
		phones: ['+7 (432) 900-01-01', '+7 (917) 210-03-08'],
		email: 'mavluda@voopik.ru',
		website: 'www.example.com/mavluda',
		relatedObjects: [
			{
				id: '1',
				title: 'Один какой-то Объект Lorem ipsum dolor sit amet, elit. Inventore, repellat.'
			},
			{
				id: '2',
				title: 'Один какой-то Объект adipisicing elit. Inventore, repellat.'
			},
			{
				id: '3',
				title: 'Один какой-то Объект Inventore, repellat.'
			}
		],
		relatedProjects: [
			{
				id: '1',
				title: 'Один какой-то Проект Lorem ipsum dolor sit amet, elit. Inventore, repellat.'
			},
			{
				id: '2',
				title: 'Один какой-то Проект adipisicing elit. Inventore, repellat.'
			},
			{
				id: '3',
				title: 'Один какой-то Проект Inventore, repellat.'
			}
		],
		relatedLinks: [
			{
				id: '0',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				date: '26 марта 2023 года',
				source: 'журнал «Прораб Перестройки», стр. 21-24'
			},

			{
				id: '1',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				date: '26 марта 2023 года',
				source: 'Интернет-портал «Наш Край Тамбов»'
			},

			{
				id: '2',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				date: '26 марта 2023 года',
				source: 'Интернет-портал «Наш Край Тамбов»'
			}
		],
		documents: [
			{
				id: '0',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				type: 'pdf',
				size: '68.5 Кбайт'
			},

			{
				id: '1',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				type: 'pdf',
				size: '68.5 Кбайт'
			},

			{
				id: '2',
				title:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
				link: '#',
				type: 'doc',
				size: '68.5 Кбайт'
			}
		],
		groups: [
			{
				id: '3',
				regionCode: '90',
				level: '1',
				title: 'Московская область',
				role: 'Участник',
				entryDate: '2019.08.28',
				status: 'Третий статус'
			}
		],
		events: [
			{
				id: '3',
				title: 'Замок Винтерфелл',
				contactPerson: 'Алексей Семенов +7(988) 999-99-00',
				partGroup: 'ВФК «Третья стража»',
				location: 'пгт Винтерфелльск-Заволжскокамский',
				dates: ['2022.02.11', '2022.02.13'],
				type: 'Организатор'
			}
		],
		projects: [
			{
				id: '3',
				title: 'проект №3',
				type: 'Второй тип',
				status: 'Перекрыт',
				region: 'Респ. Татарстан'
			}
		],
		objects: [
			{
				id: '3',
				title: 'Объект 3',
				kind: 'Памятник',
				category: 'Федеральный',
				type: 'Второй тип',
				registryNumber: '342 : 0099 : 4432 : А2',
				status: 'Перекрыт',
				region: 'Респ. Татарстан'
			},
		],
		photos: [
			{
				id: '1',
				title: 'Малые Корелы. Экскурсия по Двинскому enean euismod b',
				date: '2022.12.23',
				url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wooden_church_and_house_01.jpg'
			},
			{
				id: '2',
				title: 'Спасо-Бородинский монастырь. Часть 2',
				date: '2021.11.13',
				url: 'https://www.borodino.ru/wp-content/uploads/2017/08/DSC01241-1-1024x689.jpg'
			},
			{
				id: '3',
				title: 'Спасо-Бородинский монастырь. Часть 2',
				date: '2021.11.13',
				url: 'https://www.borodino.ru/wp-content/uploads/2020/09/IMG_20200914_122627_287.jpg'
			},
			{
				id: '4',
				title: 'Пензенское отделение ВООПИК созывает деле enean euismod b',
				date: '2018.05.01',
				url: 'https://voopik.ru/upload/iblock/e9b/otdel_voopig_b.jpg'
			},
			{
				id: '5',
				title: 'Пензенское отделение ВООПИК созывает деле enean euismod b',
				date: '2011.01.05',
				url: 'https://voopik.ru/upload/iblock/614/3110-1.jpg'
			},
		],
		videos: [
			{
				id: '1',
				title: 'Малые Корелы. Экскурсия по Двинскому enean euismod b',
				date: '2022.12.23',
				url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wooden_church_and_house_01.jpg'
			},
			{
				id: '2',
				title: 'Спасо-Бородинский монастырь. Часть 2',
				date: '2021.11.13',
				url: 'https://www.borodino.ru/wp-content/uploads/2017/08/DSC01241-1-1024x689.jpg'
			},
			{
				id: '3',
				title: 'Спасо-Бородинский монастырь. Часть 2',
				date: '2021.11.13',
				url: 'https://www.borodino.ru/wp-content/uploads/2020/09/IMG_20200914_122627_287.jpg'
			},
			{
				id: '4',
				title: 'Пензенское отделение ВООПИК созывает деле enean euismod b',
				date: '2018.05.01',
				url: 'https://voopik.ru/upload/iblock/e9b/otdel_voopig_b.jpg'
			},
			{
				id: '5',
				title: 'Пензенское отделение ВООПИК созывает деле enean euismod b',
				date: '2011.01.05',
				url: 'https://voopik.ru/upload/iblock/614/3110-1.jpg'
			},
		]
	}

]