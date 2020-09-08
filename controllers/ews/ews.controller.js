const EWS = require('node-ews');

class EWSController {
 
    findItem = async (req, res) => {
        
        const data = req.body;
        console.log(data);

        // exchange server connection info
        const ewsConfig = {
            username: data.serviceAccountEmailAddress,
            password: data.serviceAccountPassword,
            host: 'https://outlook.office365.com',
            auth: 'basic'
        };
        
        // define custom soap header
        const ewsSoapHeader = {
            'RequestServerVersion': {
                attributes: {
                Version: "Exchange2007_SP1"
                }
            },
            // 'ExchangeImpersonation': {
            //     'ConnectingSID': {
            //         'PrimarySMTPAddress': 'paulo.salles@t3nsd.onmicrosoft.com'
            //     }
            //}
        };
        
        // initialize node-ews
        const ews = new EWS(ewsConfig);
        
        // define ews api function
        const ewsFunction = 'FindItem';
        
        // define ews api function args
        const ewsArgs = {
            'attributes': {
                'Traversal': 'Shallow'
            },
            'ItemShape': {
                'BaseShape': 'IdOnly',
                'AditionalProperties': {
                    'FieldURI': {
                        'attributes': {
                            'FieldURI' : 'item:Subject'
                        }   
                    },
                    'ExtendedFieldURI': {
                        'attributes': {
                            'PropertyType': 'Binary',
                            'PropertyId': '3',
                            'DistinguishedPropertySetId': 'Meeting'
                        }
                    },
                    'ExtendedFieldURI': {
                        'attributes': {
                            'PropertyType': 'String',
                            'PropertyName': 'OnlineMeetingExternalLink',
                            'DistinguishedPropertySetId': 'PublicStrings'
                            }
                    },
                    'ExtendedFieldURI': {
                        'attributes': {
                            'PropertyType': 'String',
                            'PropertyName': 'OnlineMeetingConfLink',
                            'DistinguishedPropertySetId': 'PublicStrings'
                            }
                    },
                    'ExtendedFieldURI': {
                        'attributes': {
                            'PropertyType': 'String',
                            'PropertyName': 'UCMeetingSettings',
                            'DistinguishedPropertySetId': 'PublicStrings'
                            }
                    },
                    'FieldURI': {
                        'attributes': {
                            'FieldURI' : 'calendar:Start'
                        }   
                    },
                    'FieldURI': {
                        'attributes': {
                            'FieldURI' : 'item:Body'
                        }   
                    },
                    'FieldURI': {
                        'attributes': {
                            'FieldURI' : 'calendar:CalendarItemType'
                        }   
                    },
                    'FieldURI': {
                        'attributes': {
                            'FieldURI' : 'calendar:RecurrenceId'
                        }   
                    },
                }
            },
            'CalendarView': {
                'attributes': {
                    'StartDate': data.startDate,
                    'EndDate': data.endDate,
                    'MaxEntriesReturned': '1024'
                }
            },
            'ParentFolderIds' : {
                'DistinguishedFolderId': {
                    'attributes': {
                    'Id': 'calendar',          
                    },
                    'Mailbox': {
                        'EmailAddress': data.emailAddress,
                    }
                }
            }
        };
     
   
    // query EWS and print resulting JSON to console
    
    //console.log(ews)
        ews.run(ewsFunction, ewsArgs)
            .then(result => {
                
            console.log(JSON.stringify(result));
            res.status(200).json(result);
            })
            .catch(err => {
            console.log(err.message);
            });

            
        };
}

module.exports = new EWSController();