import { BarChart } from '@mui/x-charts/BarChart';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a custom theme to set axis text color to white
const theme = createTheme({
    components: {
        MuiChartAxis: {
            styleOverrides: {
                root: {
                    color: 'white', // Set axis label color to white
                },
            },
        },
    },
});

export default function ResponsiveBarChart() {

    return (
        <ThemeProvider theme={theme}> {/* Apply the custom theme */}
            <div className="w-full chart-view sm:block lg:hidden"> {/* Ensure responsive layout */}
                <div className="chart-view-content">
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['04/07/2024', '04/08/2024'] }]} // Data for the chart
                        series={[
                            { data: [500, 1500, 2000] },
                            { data: [150, 500, 0] },
                            { data: [0, 5] },
                        ]}
                        width={480} // Mobile width
                        height={300} // Mobile height
                        margin={{ top: 20, bottom: 30, left: 80, right: 30 }}
                    />
                </div>
                <div className='flex items-center justify-center gap-6 sm:gap-10 mt-4'> {/* Ensure responsive icon section */}
                    <div className='flex items-center gap-2'>
                        <img className='h-3 sm:h-5' src="Assets/Images/All Icons/Rectangle 59.svg" alt="Waifu Points" />
                        <p>Waifu Points</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img className='h-3 sm:h-5' src="Assets/Images/All Icons/Rectangle 58.svg" alt="Llama Points" />
                        <p>Llama Points</p>
                    </div>
                </div>
            </div>
            <div className="w-full chart-view sm-hidden md:hidden lg:block"> {/* Ensure responsive layout */}
                <div className="chart-view-content">
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['04/07/2024', '04/08/2024'] }]} // Data for the chart
                        series={[
                            { data: [500, 1500, 2000] },
                            { data: [150, 500, 0] },
                            { data: [0, 5] },
                        ]}
                        width={850} // Mobile width
                        height={300} // Mobile height
                        margin={{ top: 30, bottom: 30, left: 90, right: 40 }}
                    />
                </div>
                <div className='flex items-center justify-center gap-6 sm:gap-10 mt-4'> {/* Ensure responsive icon section */}
                    <div className='flex items-center gap-2'>
                        <img className='h-3 sm:h-5' src="Assets/Images/All Icons/Rectangle 59.svg" alt="Waifu Points" />
                        <p>Waifu Points</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img className='h-3 sm:h-5' src="Assets/Images/All Icons/Rectangle 58.svg" alt="Llama Points" />
                        <p>Llama Points</p>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
