var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});

client.ping({requestTimeout: 30000,}, function (err) {
    if(err){
        console.error(err);
    }
    else{
        console.log('work well');
    }
});

client.search({
    index: 'logstash-logs-2018.12.26',
    type: 'doc',
    body:{
        aggs:{
            agg_folder:{
                terms:{
                    "field": "log_folder.keyword"
                },
                aggs:{
                    agg_log:{
                        terms:{
                            "field": "log_name.keyword"
                        }
                    }
                }
            }
        }
    }
}).then(function (res){
    console.log(res.aggregations.agg_folder)
}, function (err) {
    console.error(err);
});