﻿#include <Windows.h>
#include <iostream>


void printProcessPrty(HANDLE h)
{
    DWORD prty = GetPriorityClass(h);
    std::cout << " --- Current PID = " << GetCurrentProcessId() << " \n";
    switch (prty)
    {
        case IDLE_PRIORITY_CLASS:           std::cout << " ----+ Priority of process = IDLE_PRIORITY_CLASS \n"; break;
        case BELOW_NORMAL_PRIORITY_CLASS:   std::cout << " ----+ Priority of process = BELOW_NORMAL_PRIORITY_CLASS \n"; break;
        case NORMAL_PRIORITY_CLASS:         std::cout << " ----+ Priority of process = NORMAL_PRIORITY_CLASS \n"; break;
        case ABOVE_NORMAL_PRIORITY_CLASS:   std::cout << " ----+ Priority of process = ABOVE_NORMAL_PRIORITY_CLASS \n"; break;
        case HIGH_PRIORITY_CLASS:           std::cout << " ----+ Priority of process = HIGH_PRIORITY_CLASS \n"; break;
        case REALTIME_PRIORITY_CLASS:       std::cout << " ----+ Priority of process = REALTIME_PRIORITY_CLASS \n"; break;
        default:                            std::cout << " ----+ Priority of process = ? \n"; break;
    }
    return;
}

void printThreadPrty(HANDLE h)
{
    DWORD prty = GetThreadPriority(h);
    std::cout << " --- Current Thread ID = " << GetCurrentThreadId() << "\n";
    std::cout << " ----+ priority = " << prty << " \n";
    switch (prty)
    {
        case THREAD_PRIORITY_LOWEST:        std::cout << " ----+ Priority of thread = THREAD_PRIORITY_LOWEST \n"; break;
        case THREAD_PRIORITY_BELOW_NORMAL:  std::cout << " ----+ Priority of thread = THREAD_PRIORITY_BELOW_NORMAL \n"; break;
        case THREAD_PRIORITY_NORMAL:        std::cout << " ----+ Priority of thread = THREAD_PRIORITY_NORMAL \n"; break;
        case THREAD_PRIORITY_ABOVE_NORMAL:  std::cout << " ----+ Priority of thread = THREAD_PRIORITY_ABOVE_NORMAL \n"; break;
        case THREAD_PRIORITY_HIGHEST:       std::cout << " ----+ Priority of thread = THREAD_PRIORITY_HIGHEST \n"; break;
        case THREAD_PRIORITY_IDLE:          std::cout << " ----+ Priority of thread = THREAD_PRIORITY_IDLE \n"; break;
        case THREAD_PRIORITY_TIME_CRITICAL: std::cout << " ----+ Priority of thread = THREAD_PRIORITY_TIME_CRITICAL \n"; break;
        default:                            std::cout << " ----+ Priority of thread = ? \n"; break;
    }
    DWORD icpu = SetThreadIdealProcessor(h, MAXIMUM_PROCESSORS);  
    std::cout << " ----+ Processor = " << icpu << " \n";
    return;
}


int main()
{
    HANDLE hp = GetCurrentProcess();
    HANDLE ht = GetCurrentThread();

    printProcessPrty(hp);
    printThreadPrty(ht);

    try
    {
        {
            DWORD pa = NULL, sa = NULL;
            char buf[100];
            if (!SetProcessAffinityMask(hp, 6)) throw "SetProcessAffinityMask";

            if (!GetProcessAffinityMask(hp, &pa, &sa)) throw "GetProcessAffinityMask";
            _itoa_s(pa, buf, 2);
            std::cout << " Process Affinity Mask: " << buf << "\n"; 
            _itoa_s(sa, buf, 2);
            std::cout << " System Affinity Mask: " << buf << "\n";

            if (GetProcessAffinityMask(hp, &pa, &sa)) {
                int processorCount = 0;
                while (pa) {
                    if (pa & 1) {
                        processorCount++;
                    }
                    pa = pa >> 1;
                }
                std::cout << " ---- count = " << processorCount << " \n";
            }


        }
    }
    catch (char* msg) { std::cout << "Error " << msg << "\n"; }


    system("pause");
    return 0;
}