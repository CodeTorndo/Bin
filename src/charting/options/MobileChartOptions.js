import createXAxis from '../axis/ChartXAxis';
import createYAxis from '../axis/ChartYAxis';
import createSeries from '../series/ChartSeries';
import createGrid from '../grid/MobileChartGrid';
import createMarkLineSpot from '../mark-line/ChartMarkLineSpot';
import createDataZoom from '../data-zoom/MobileDataZoom';

export default ({ history, theme }) => ({
    // tooltip: createTooltip(),
    grid: createGrid({ color: theme.gridColor }),
    xAxis: createXAxis({ color: theme.gridColor, data: history.length > 0 ? history.map(x => x.epoch) : [0], textColor: theme.axisTextColor }),
    yAxis: createYAxis({ color: theme.gridColor, textColor: theme.axisTextColor }),
    series: createSeries({
        data: history.map(x => x.quote),
        markLine: createMarkLineSpot(history),
        // markPoint: createMarkPointSpot(history),
    }),
    dataZoom: createDataZoom(),
});
