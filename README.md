# concept_podo
code du projet au meetup yomeva

## Installation

### Requirement

Mongodb 3.4 <br>
Node 8.5

```bash
npm install
```

### Conf

configure the application with the config/conf.js

### Launch app

```bash
npm start
```

## Routes

### GET /api/v1/suggests

Search for mold suggestion in the full database

Return success: 
```json
{
    "search": {
        "shoeLong": {
        	"value" : 93,
        	"pond" : 2
    	},
        "shoeWidth": {
        	"value" : 186,
        	"pond" : 2
        },
        "flankLineTurn": {
        	"value" : 55,
        	"pond" : 1
        },
        "kickTurn": {
        	"value" : 6,
        	"pond" : 1
        },
        "entry": {
        	"value" : 95,
        	"pond" : 1
        },
        "height_10": {
        	"value" : 22,
        	"pond" : 1
        },
        "Cambrure": {
        	"value" : 179,
        	"pond" : 1
        },
        "heelWidth": {
        	"value" : 186,
        	"pond" : 1
        }
    },
    "statusCode": 200,
    "result": [
        {
            "_id": "59d8de83ef9cb2d2491ec880",
            "diff": 2,
            "doc": {
                "_id": "59d8de83ef9cb2d2491ec880",
                "shoeLong": 93,
                "shoeWidth": 186,
                "flankLineTurn": 53,
                "kickTurn": 6,
                "entry": 95,
                "height_10": 22,
                "Cambrure": 179,
                "heelWidth": 186,
                "filename": "test849627",
                "pathfile": "test/test849627",
                "moldExist": true,
                "moldExistRetouch": false,
                "user": "userTest",
                "createAt": "2017-10-07T14:02:43.250Z",
                "updateAt": "2017-10-07T14:02:43.250Z"
            }
        },
        {
            "_id": "59d8deecef9cb2d2491edb26",
            "diff": 106,
            "doc": {
                "_id": "59d8deecef9cb2d2491edb26",
                "shoeLong": 103,
                "shoeWidth": 180,
                "flankLineTurn": 62,
                "kickTurn": 24,
                "entry": 137,
                "height_10": 169,
                "Cambrure": 117,
                "heelWidth": 179,
                "filename": "test728694",
                "pathfile": "test/test728694",
                "moldExist": false,
                "moldExistRetouch": true,
                "user": "userTest",
                "createAt": "2017-10-07T14:04:28.632Z",
                "updateAt": "2017-10-07T14:04:28.632Z"
            }
        },
        {
            "_id": "59d8ded3ef9cb2d2491ed6fd",
            "diff": 119,
            "doc": {
                "_id": "59d8ded3ef9cb2d2491ed6fd",
                "shoeLong": 108,
                "shoeWidth": 193,
                "flankLineTurn": 60,
                "kickTurn": 42,
                "entry": 61,
                "height_10": 111,
                "Cambrure": 44,
                "heelWidth": 186,
                "filename": "test022683",
                "pathfile": "test/test022683",
                "moldExist": false,
                "moldExistRetouch": false,
                "user": "userTest",
                "createAt": "2017-10-07T14:04:03.461Z",
                "updateAt": "2017-10-07T14:04:03.461Z"
            }
        }
    ]
}
```
Return error (example): 
```json
{
    "statusCode" : 404,
    "result" : "bad_request"
}
```

_Query Parameters_

```json
{
   "ref" : "ref",
   "search" : {
        "shoeLong": {
        	"value" : 9.3,
        	"pond" : 2
    	},
        "shoeWidth": {
        	"value" : 18.6,
        	"pond" : 2
        },
        "flankLineTurn": {
        	"value" : 5.5,
        	"pond" : 1
        },
        "kickTurn": {
        	"value" : 0.6,
        	"pond" : 1
        },
        "entry": {
        	"value" : 9.5,
        	"pond" : 1
        },
        "height_10": {
        	"value" : 2.2,
        	"pond" : 1
        },
        "Cambrure": {
        	"value" : 17.9,
        	"pond" : 1
        },
        "heelWidth": {
        	"value" : 18.6,
        	"pond" : 1
        }
    }
}
```

### GET /api/v1/file/:filename

Get a single mold entry

Return success: 
```json
{
    "statusCode": 200,
    "result": {
        "_id": "59d8de84ef9cb2d2491ec8aa",
        "shoeLong": 81,
        "shoeWidth": 173,
        "flankLineTurn": 119,
        "kickTurn": 8,
        "entry": 145,
        "height_10": 23,
        "Cambrure": 167,
        "heelWidth": 181,
        "filename": "test235830",
        "pathfile": "test/test235830",
        "moldExist": false,
        "moldExistRetouch": false,
        "user": "userTest",
        "createAt": "2017-10-07T14:02:44.069Z",
        "updateAt": "2017-10-07T14:02:44.069Z"
    }
}
```

Return error (example): 
```json
{
    "statusCode": 404,
    "result": "not_found"
}
```

_URL Parameters_

Parameter | Required | Description
--------- | ------- | -----------
filename | required | The file name to find

### POST /api/v1/upsert

Create or update a mold. If the path file of the mold exist, it is updating.

Return success : 
```json
{
    "statusCode": 200,
    "result": true
}
```

Return error (example): 
```json
{
    "statusCode" : 500,
    "result" : "database error details"
}
```

_Query Parameters_

```json
{
	"ref" : "ref",
	"mold" : {
        "shoeLong"            : 20.5,
        "shoeWidth"           : 10,
        "flankLineTurn"       : 5.3,
        "kickTurn"            : 1.7,
        "entry"               : 12,
        "height_10"           : 25,
        "cambrure"            : 5.9,
        "heelWidth"           : 2,
        "moldExist"           : true,
        "moldExistRetouch"    : false
	},
	"user" : "userTest",
	"file" : {
		"filename" : "testFile21",
		"pathfile" : "test/testFile21"
	}
}
```

### DELETE /api/v1/mold

Delete a mold entry
 
Return success : 
```json
{
    "statusCode": 200,
    "result": true
}
```

Return error (example): 
```json
{
  "statusCode":404,
  "result": "not_found"
}
```

_query parameters_
```json
{ 
	"pathfile": "test/testFile21" 
}
```

## Deploy

pm2 deploy preprod
