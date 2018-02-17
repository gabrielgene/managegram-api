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
