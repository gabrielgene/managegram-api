# Cron job Project

***

### Example message:
```json
'{ 
   "user": "managerinsta97", 
   "pass": "insta@123", 
   "status": "running", 
   "tag_type": "disable", 
   "tag_list": ["hero"], 
   "profile_type": "enable", 
   "profile_list": ["marvel"]
}'
```

***

### Cron job "Doc"
```
 +--------- Minute (0-59)                    | Output Dumper: >/dev/null 2>&1
 | +------- Hour (0-23)                      | Multiple Values Use Commas: 3,12,47
 | | +----- Day Of Month (1-31)              | Do every X intervals: */X  -> Example: */15 * * * *  Is every 15 minutes
 | | | +--- Month (1 -12)                    | Aliases: @reboot -> Run once at startup; @hourly -> 0 * * * *;
 | | | | +- Day Of Week (0-6) (Sunday = 0)   | @daily -> 0 0 * * *; @weekly -> 0 0 * * 0; @monthly ->0 0 1 * *;
 | | | | |                                   | @yearly -> 0 0 1 1 *;
 ```


Check actual config: `kubectl config view`
Look this: `https://console.cloud.google.com/kubernetes/clusters/details/us-east4-a/cluster-1?project=managegram-196020&hl=pt-BR&tab=nodes&persistent_volumes_tablesize=50&storage_class_tablesize=50&nodes_tablesize=50`
Return to Jus config: https://github.com/jusbrasil/wiki/blob/master/kubernetes/getting-started.md
