exports.definition = {
	config: {
		columns: {
		    "remburseId": "bigint",
		    "name": "string",
		    "receiptDate": "datetime",
		    "isDeleted": "boolean",
		    "amount": "double",
		    "dateCreated": "datetime",
		    "lastUpdated": "datetime",
		    "lastUpdate": "datetime",
		    "urlImageMedium": "string",
		    "urlImageSmall": "string",
		    "urlImageOriginal": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "reimburseDetail"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};