<template>
  <div class="space-y-6">
    <!-- Timezone Selection -->
    <VaCard>
      <VaCardContent>
        <div class="text-xs font-bold text-primary uppercase tracking-widest mb-4">Timezone Settings</div>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="flex items-center gap-2">
            <VaIcon name="public" color="primary" />
            <span class="font-semibold text-gray-700">Current Timezone:</span>
            <VaBadge :text="current_timezone" color="primary" />
          </div>
          <VaSelect
            v-model="selected_timezone"
            :options="timezoneNameList"
            placeholder="Change timezone..."
            searchable
            @update:modelValue="selectedTimezone"
            @update:search="onTimezoneSearch"
            class="min-w-[250px]"
          />
        </div>
      </VaCardContent>
    </VaCard>

    <!-- Current Time Display -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <VaCard>
        <VaCardContent class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-primary uppercase tracking-widest">Unix Timestamp</span>
            <VaButton size="small" preset="secondary" icon="content_copy" @click="copyToClipboard(now)">Copy</VaButton>
          </div>
          <div class="text-3xl font-mono font-bold text-gray-800">{{ now }}</div>
        </VaCardContent>
      </VaCard>

      <VaCard>
        <VaCardContent class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-primary uppercase tracking-widest">Local DateTime</span>
            <VaButton size="small" preset="secondary" icon="content_copy" @click="copyToClipboard(now_datetime)">Copy</VaButton>
          </div>
          <div class="text-2xl font-semibold text-gray-800">{{ now_datetime }}</div>
        </VaCardContent>
      </VaCard>
    </div>

    <!-- Conversion Tools -->
    <VaCard>
      <VaCardContent>
        <div class="text-xs font-bold text-primary uppercase tracking-widest mb-4">Timestamp to Date</div>
        <div class="flex gap-3 items-end">
          <VaInput
            v-model="timestamp_value"
            label="Unix Timestamp"
            placeholder="Enter timestamp..."
            class="flex-grow font-mono"
            @keyup.enter="timestampConvert"
          />
          <VaButton @click="timestampConvert" class="h-[36px]">Convert</VaButton>
          <VaButton preset="secondary" border-color="warning" @click="timeStringListClean" class="h-[36px]">Clear</VaButton>
        </div>
        
        <div v-if="time_string_list.length > 0" class="mt-6">
          <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Recent Results</div>
          <div class="flex flex-wrap gap-2">
            <VaBadge
              v-for="time in time_string_list"
              :key="time"
              :text="time"
              color="backgroundPrimary"
              text-color="primary"
              class="px-3 py-1 text-sm font-mono border border-primary/20"
            />
          </div>
        </div>
      </VaCardContent>
    </VaCard>

    <!-- Date Details -->
    <VaCard>
      <VaCardContent>
        <div class="text-xs font-bold text-primary uppercase tracking-widest mb-4">Date Inspector</div>
        <VaInput v-model="time_string" label="Date String" placeholder="Enter date string..." class="w-full mb-6 font-mono" />
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="item in dateInfoItems" :key="item.label" class="p-3 bg-gray-50 rounded-lg border border-gray-100 flex flex-col justify-center">
            <div class="text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-wider">{{ item.label }}</div>
            <div class="font-mono text-sm truncate text-gray-700">{{ item.value }}</div>
          </div>
        </div>
      </VaCardContent>
    </VaCard>
  </div>
</template>

<script>
import moment from 'moment-timezone';

const time_format_string = "YYYY-MM-DD HH:mm:ss ZZ";

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
      intervalId: null,
    }
  },
  created() {
    if (typeof window !== 'undefined') {
      const localStorage = window.localStorage;
      if (!localStorage.timezone) {
        localStorage.timezone = moment.tz.guess();
      }
      this.current_timezone = localStorage.timezone;
    }
    this.refreshNow();
    this.intervalId = setInterval(this.updateTime, 1000);
  },
  beforeUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  },
  computed: {
    isValid() {
      return moment(this.time_string).isValid() ? "Yes" : "No";
    },
    theTime() {
      return moment.tz(this.time_string, this.current_timezone);
    },
    dateInfoItems() {
      const time = this.theTime;
      const isValid = time.isValid();
      return [
        { label: 'Datetime String', value: this.time_string },
        { label: 'Is Valid', value: isValid ? 'Yes' : 'No' },
        { label: 'Unix Timestamp', value: isValid ? time.unix() : '-' },
        { label: 'Milliseconds', value: isValid ? time.valueOf() : '-' },
        { label: 'Day of Year', value: isValid ? time.format("DDDD") : '-' },
        { label: 'Week of Year', value: isValid ? time.format("w") : '-' },
        { label: 'Timezone Offset', value: isValid ? time.format("ZZ") : '-' }
      ];
    },
    timezoneNameList() {
      return moment.tz.names()
        .filter(zoneName => zoneName.toUpperCase().includes(this.search_timezone_input.toUpperCase()))
        .slice(0, 20);
    }
  },
  methods: {
    timestampConvert() {
      if (!this.timestamp_value) return;
      const val = Number(this.timestamp_value);
      // Heuristic for seconds vs milliseconds
      const factor = val > 10000000000 ? 1 : 1000;
      let time = moment(val * factor).tz(this.current_timezone).format(time_format_string)
      this.time_string_list.unshift(time);
    },
    timeStringListClean() {
      this.time_string_list = [];
    },
    refreshNow() {
      this.now = moment().unix();
      this.now_datetime = moment().tz(this.current_timezone).format("YYYY-MM-DD HH:mm:ss");
    },
    selectedTimezone(val) {
      if (!val) return;
      this.current_timezone = val;
      if (typeof window !== 'undefined') {
        window.localStorage.timezone = val;
      }
      this.refreshNow();
    },
    onTimezoneSearch(e) {
      this.search_timezone_input = e
    },
    updateTime() {
      this.refreshNow();
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.$vaToast.init({
          message: 'Copied to clipboard!',
          color: 'success',
          duration: 2000
        });
      });
    }
  }
}
</script>

<style scoped>
/* No more local margin classes needed, using Tailwind space-y-6 */
</style>
