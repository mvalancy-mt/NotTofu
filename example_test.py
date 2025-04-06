import openhtf as htf
from openhtf.output.callbacks import json_factory
import time

@htf.measures(
    htf.Measurement('voltage').in_range(0, 5.0),
    htf.Measurement('current').in_range(0, 1.0)
)
def measure_power(test):
    # Simulate measuring voltage and current
    time.sleep(1)  # Simulate measurement time
    test.measurements.voltage = 3.3
    test.measurements.current = 0.5
    
@htf.PhaseOptions()
def hello_world(test):
    test.logger.info('Hello World!')
    return htf.PhaseResult.CONTINUE

if __name__ == '__main__':
    test = htf.Test(
        hello_world,
        measure_power,
    )
    
    test.add_output_callbacks(json_factory.OutputToJSON(
        './test_output.json', indent=2))
    
    test.execute(test_start=time.time()) 