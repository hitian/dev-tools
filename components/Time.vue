<template>
    <div>
        <VaCard color="#ECF0F1">
            <VaCardTitle>TimeZone</VaCardTitle>
            <VaCardContent>
                <div class="row">
                    <div class="flex flex-col xs2 v-center">
                        <div style="text-align: left;"> {{ current_timezone }}</div>
                    </div>
                    <div class="flex flex-col v-center" style="width: 280px;">
                        <VaSelect v-model="selected_timezone" :options="timezoneNameList" placeholder="type to search"
                            @hit="selectedTimezone" :search="search_timezone_input" :maxMatches="maxMatches" searchable
                            style="width: 150px" @update:search="onTimezoneSearch"
                            @update:modelValue="selectedTimezone" />
                    </div>
                </div>

            </VaCardContent>
        </VaCard>
        <VaCard class="my-mt-10">
            <VaCardTitle>Now</VaCardTitle>
            <VaCardContent>
                <div class="row">
                    <div class="flex flex-col xs2">
                        <VaInput label="unix timestamp" v-model="now" readonly />
                    </div>
                    <div class="flex flex-col xs3 my-ml-10">
                        <VaInput label="datetime" v-model="now_datetime" readonly />
                    </div>
                </div>
            </VaCardContent>
        </VaCard>
        <VaCard class="my-mt-10">
            <VaCardTitle>timestamp to time</VaCardTitle>
            <VaCardContent>
                <VaForm ref="myForm" inline immediate hide-error-messages class="flex flex-col gap-2 mb-2">
                    <VaInput v-model="timestamp_value" placeholder="timestamp" @keyup.enter="timestampConvert" />
                    <VaButton color="#3D9209" class="my-ml-10" @click="timestampConvert">
                        Convert
                    </VaButton>
                    <VaButton color="#FFD43A" class="my-ml-10" @click="timeStringListClean">
                        Clean
                    </VaButton>
                </VaForm>
                <p class="my-mt-10">
                    <VaBadge :text="time" v-if="time_string_list" v-for="time in time_string_list" :key="time"
                        color="#B3D943" class="my-ml-10" style="--va-badge-font-size: 18px" />
                </p>
            </VaCardContent>
        </VaCard>
        <VaCard class="my-mt-10">
            <VaCardTitle>Time Info</VaCardTitle>
            <VaCardContent>
                <p>
                    <VaInput v-model="time_string" placeholder="timestamp" />
                </p>
                <table class="va-table">
                    <thead>
                        <tr>
                            <th>type</th>
                            <th>value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>datetime string</td>
                            <td>{{ time_string }}</td>
                        </tr>
                        <tr>
                            <td>isValid</td>
                            <td>{{ isValid }}</td>
                        </tr>
                        <tr>
                            <td>timestamp</td>
                            <td>{{ Stimestamp }}</td>
                        </tr>
                        <tr>
                            <td>timestamp(milliseconds)</td>
                            <td>{{ StimestampMilliseconds }}</td>
                        </tr>
                        <tr>
                            <td>day of year</td>
                            <td>{{ Sdayofyear }}</td>
                        </tr>
                        <tr>
                            <td>week of year</td>
                            <td>{{ Sweekofyear }}</td>
                        </tr>
                        <tr>
                            <td>timezone</td>
                            <td>{{ Stimezone }}</td>
                        </tr>

                    </tbody>
                </table>
            </VaCardContent>
        </VaCard>
    </div>
</template>

<script>
import moment from 'moment-timezone';

const time_format_string = "YYYY-MM-DD HH:mm:ss ZZ";
const localStorage = window.localStorage;

export default {
    data() {
        return {
            now: moment().unix(),
            now_datetime: "",
            timestamp_value: "",
            time_string_list: [],
            time_string: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),

            current_timezone: "",
            selected_timezone: "",
            search_timezone_input: "",
            maxMatches: 1000,
        }
    },
    created() {
        if (this.current_timezone == "") {
            if (!localStorage.timezone) {
                localStorage.timezone = moment.tz.guess();
            }
            this.current_timezone = localStorage.timezone;
        }
        this.refreshNow();
    },
    computed: {
        nowffda() {
            return moment().unix();
        },
        isValid() {
            return moment(this.time_string).isValid() ? "Yes" : "No";
        },
        theTime() {
            return moment.tz(this.time_string, this.current_timezone);
        },
        Stimestamp() {
            let time = this.theTime;
            return time.isValid() ? time.unix() : "-";
        },
        StimestampMilliseconds() {
            let time = this.theTime;
            return time.isValid() ? time.valueOf() : "-";
        },
        Sdayofyear() {
            let time = this.theTime;
            return time.isValid() ? time.format("DDDD") : "-";
        },
        Sweekofyear() {
            let time = this.theTime;
            return time.isValid() ? time.format("w") : "-";
        },
        Stimezone() {
            let time = this.theTime;
            return time.isValid() ? time.format("ZZ") : "-";
        },

        timezoneNameList() {
            return moment.tz.names().filter(zoneName => zoneName.toUpperCase().indexOf(this.search_timezone_input.toUpperCase()) != -1).slice(0, 10);
        }
    },
    methods: {
        timestampConvert() {
            let time = moment(this.timestamp_value * 1000).tz(this.current_timezone).format(time_format_string)
            let list = this.time_string_list;
            list.unshift(time);
            this.time_format_string = list;
        },
        timeStringListClean() {
            this.time_string_list = [];
        },
        refreshNow() {
            this.now = moment().unix();
            this.now_datetime = moment().tz(this.current_timezone).format("YYYY-MM-DD HH:mm:ss");
        },
        selectedTimezone() {
            if (!confirm("change timezone to " + this.selected_timezone + "?")) {
                return;
            }
            this.current_timezone = this.selected_timezone;
            localStorage.timezone = this.selected_timezone;

            this.refreshNow();
        },
        onTimezoneSearch(e) {
            this.search_timezone_input = e
        }
    }
}
</script>

<style scoped>
@import "vuestic-ui/styles/grid";

.v-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.my-ml-10 {
    margin-left: 10px;
}

.my-mt-10 {
    margin-top: 10px;
}
</style>